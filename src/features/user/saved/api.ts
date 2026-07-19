import { httpClient } from "@/services/httpClient";
import type { SavedItem, ToggleSavedResponse } from "./types";

export const savedApi = {
	// GET /saved-items/me — the logged-in user's saved products
	getMine: () => httpClient.get<ApiResponse<SavedItem[]>>("/saved-items/me"),

	// POST /saved-items/:productId/toggle — adds if not saved, removes if already saved
	toggle: (productId: string) =>
		httpClient.post<ApiResponse<ToggleSavedResponse>>(
			`/saved-items/${productId}/toggle`,
			{},
		),
};
