import { httpClient } from "@/services/httpClient";
import type { PaginatedApiResponse } from "@/types/paginated-response";
import type {
	CreateTicketPayload,
	SupportTicket,
	TicketMessage,
	TicketWithMessages,
} from "./types";

export const supportApi = {
	// GET /support/tickets/me — the logged-in user's own tickets
	getMine: (params: { page: number; limit: number }) =>
		httpClient.get<PaginatedApiResponse<SupportTicket>>(
			"/support/tickets/me",
			params,
		),

	// GET /support/tickets/:id — ticket detail + full message thread
	// (backend enforces that only the owner or staff can view it)
	getOne: (id: string) =>
		httpClient.get<ApiResponse<TicketWithMessages>>(`/support/tickets/${id}`),

	// POST /support/tickets — create a new ticket while logged in
	create: (payload: CreateTicketPayload) =>
		httpClient.post<ApiResponse<SupportTicket>>("/support/tickets", payload),

	// POST /support/tickets/:id/messages — reply on an existing ticket
	reply: (id: string, body: string) =>
		httpClient.post<ApiResponse<TicketMessage>>(
			`/support/tickets/${id}/messages`,
			{ body },
		),
};
