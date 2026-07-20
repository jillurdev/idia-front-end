import { httpClient } from "@/services/httpClient";
import type { CheckoutResponse, Purchase } from "./types";

export const purchasesApi = {
	// POST /purchases/checkout — starts a LemonSqueezy checkout session.
	// Always send an array: [productId] for a single Buy Now, or several
	// productIds for a bulk "Buy Selected" from Saved Items.
	checkout: (productIds: string[]) =>
		httpClient.post<ApiResponse<CheckoutResponse>>("/purchases/checkout", {
			productIds,
		}),

	// GET /purchases/me — the logged-in user's purchase history
	getMine: () => httpClient.get<ApiResponse<Purchase[]>>("/purchases/me"),
};
