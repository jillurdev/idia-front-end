import { httpClient } from "@/services/httpClient";
import type { CreateGuestTicketPayload, SupportTicket } from "@/features/user/support/types";

export const guestSupportApi = {
	// POST /support/tickets/guest — public endpoint, no auth. Kept as its
	// own function/module so it never shares code paths with the
	// logged-in user's ticket API.
	create: (payload: CreateGuestTicketPayload) =>
		httpClient.post<ApiResponse<SupportTicket>>(
			"/support/tickets/guest",
			payload,
		),
};
