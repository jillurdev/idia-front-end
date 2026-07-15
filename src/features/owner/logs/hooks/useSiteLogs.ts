import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { siteLogsApi } from "../api";
import type { SiteLogFilters } from "../types";

export const siteLogsQueryKey = (filters: SiteLogFilters) =>
	["owner", "site-logs", filters] as const;

export function useSiteLogs(filters: SiteLogFilters) {
	return useQuery({
		queryKey: siteLogsQueryKey(filters),
		queryFn: () => siteLogsApi.getAll(filters),
		select: res => ({ logs: res.data, meta: res.meta }),
		placeholderData: keepPreviousData,  
		staleTime: 30_000,
	});
}
