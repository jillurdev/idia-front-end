import { httpClient } from "@/services/httpClient";
import type { PaginatedApiResponse } from "@/types/paginated-response";
import type { SiteLog, SiteLogFilters } from "./types";

export const siteLogsApi = {
	getAll: (filters: SiteLogFilters) =>
		httpClient.get<PaginatedApiResponse<SiteLog>>("/site-logs", filters),
};
