import { httpClient } from "@/services/httpClient";
import type { OwnerOverview } from "./types";

export const overviewApi = {
	get: () => httpClient.get<ApiResponse<OwnerOverview>>("/owner/overview"),
};
