import { httpClient } from "@/services/httpClient";
import type { CheckoutResponse, Purchase } from "./types";

export const purchasesApi = {
	// POST /purchases/checkout — starts a LemonSqueezy checkout session
	checkout: (productId: string) =>
		httpClient.post<ApiResponse<CheckoutResponse>>("/purchases/checkout", {
			productId,
		}),

	// GET /purchases/me — the logged-in user's purchase history
	getMine: () => httpClient.get<ApiResponse<Purchase[]>>("/purchases/me"),
};
