import { r as reactExports } from "./index-D4mmtgjo.js";
const PAGE_SIZE = 25;
function usePagination(data, pageSize = PAGE_SIZE) {
  const [page, setPage] = reactExports.useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const items = reactExports.useMemo(
    () => data.slice((safePage - 1) * pageSize, safePage * pageSize),
    [data, safePage, pageSize]
  );
  const goToPage = reactExports.useCallback(
    (p) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages]
  );
  const nextPage = reactExports.useCallback(
    () => goToPage(safePage + 1),
    [goToPage, safePage]
  );
  const prevPage = reactExports.useCallback(
    () => goToPage(safePage - 1),
    [goToPage, safePage]
  );
  const resetPage = reactExports.useCallback(() => setPage(1), []);
  return {
    items,
    page: safePage,
    totalPages,
    totalItems: data.length,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPage
  };
}
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
export {
  usePagination as a,
  useDebounce as u
};
