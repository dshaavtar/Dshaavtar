import { useCallback, useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 25;

export interface PaginationResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  goToPage: (p: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

/** Takes a full filtered array and returns a windowed page of items + controls. */
export function usePagination<T>(
  data: T[],
  pageSize = PAGE_SIZE,
): PaginationResult<T> {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // Clamp page to valid range whenever data changes
  const safePage = Math.min(page, totalPages);

  const items = useMemo(
    () => data.slice((safePage - 1) * pageSize, safePage * pageSize),
    [data, safePage, pageSize],
  );

  const goToPage = useCallback(
    (p: number) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages],
  );
  const nextPage = useCallback(
    () => goToPage(safePage + 1),
    [goToPage, safePage],
  );
  const prevPage = useCallback(
    () => goToPage(safePage - 1),
    [goToPage, safePage],
  );
  const resetPage = useCallback(() => setPage(1), []);

  return {
    items,
    page: safePage,
    totalPages,
    totalItems: data.length,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
}

/** 300 ms debounce hook for search inputs. */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
