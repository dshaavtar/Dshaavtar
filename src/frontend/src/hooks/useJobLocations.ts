import { useCallback, useEffect, useState } from "react";
import { useBackendActor } from "./useBackend";

export interface JobLocation {
  id: string;
  jobId: string;
  city: string;
  pincode: string[];
  createdAt: bigint;
}

export function useAddJobLocation() {
  const { actor } = useBackendActor();

  return useCallback(
    async (loc: { jobId: string; city: string; pincode?: string[] }) => {
      if (!actor) throw new Error("Not connected");
      const fn = (actor as unknown as Record<string, unknown>).addJobLocation as
        | ((jobId: string, city: string, pincode: string[]) => Promise<unknown>)
        | undefined;
      if (!fn) throw new Error("addJobLocation not available on backend");
      const result = await fn.call(
        actor,
        loc.jobId,
        loc.city,
        loc.pincode ?? [],
      );
      return result;
    },
    [actor],
  );
}

export function useGetJobLocations(jobId: string) {
  const { actor } = useBackendActor();
  const [locations, setLocations] = useState<JobLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || !jobId) {
      setLocations([]);
      return;
    }

    let cancelled = false;

    async function fetchLocations() {
      setLoading(true);
      setError(null);
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getJobLocations as ((jobId: string) => Promise<unknown>) | undefined;
        if (!fn) {
          setLocations([]);
          return;
        }
        const result = await fn.call(actor, jobId);
        if (cancelled) return;

        if (Array.isArray(result)) {
          const mapped: JobLocation[] = result.map(
            (item: Record<string, unknown>) => ({
              id: String(item.id ?? ""),
              jobId: String(item.jobId ?? ""),
              city: String(item.city ?? ""),
              pincode: Array.isArray(item.pincode)
                ? item.pincode.map((p: unknown) => String(p))
                : [],
              createdAt:
                typeof item.createdAt === "bigint" ? item.createdAt : BigInt(0),
            }),
          );
          setLocations(mapped);
        } else {
          setLocations([]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLocations([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLocations();

    return () => {
      cancelled = true;
    };
  }, [actor, jobId]);

  return { locations, loading, error };
}

export function useDeleteJobLocation() {
  const { actor } = useBackendActor();

  return useCallback(
    async (locationId: string) => {
      if (!actor) throw new Error("Not connected");
      const fn = (actor as unknown as Record<string, unknown>)
        .deleteJobLocation as
        | ((locationId: string) => Promise<unknown>)
        | undefined;
      if (!fn) throw new Error("deleteJobLocation not available on backend");
      const result = await fn.call(actor, locationId);
      return result;
    },
    [actor],
  );
}
