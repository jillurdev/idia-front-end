import { httpClient } from "@/services/httpClient";
import type { PaginatedApiResponse } from "@/types/paginated-response";
import type { TicketStatus, TicketWithUser } from "@/features/user/support/types";

export interface AdminTicketFilters {
	page: number;
	limit: number;
	status?: TicketStatus | "ALL";
	search?: string;
}

export const ownerSupportApi = {
	// GET /support/tickets — staff only (ADMIN/OWNER), enforced by backend RolesGuard
	getAll: (filters: AdminTicketFilters) => {
		const { status, ...rest } = filters;
		return httpClient.get<PaginatedApiResponse<TicketWithUser>>(
			"/support/tickets",
			{ ...rest, ...(status && status !== "ALL" ? { status } : {}) },
		);
	},

	// PATCH /support/tickets/:id/status — staff only
	updateStatus: (id: string, status: TicketStatus) =>
		httpClient.patch<ApiResponse<TicketWithUser>>(
			`/support/tickets/${id}/status`,
			{ status },
		),
};
