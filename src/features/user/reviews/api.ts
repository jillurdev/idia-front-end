import { httpClient } from "@/services/httpClient";
import type { MyReview } from "./types";

export const reviewsApi = {
	// GET /reviews/me — the logged-in user's own reviews (approved + pending)
	getMine: () => httpClient.get<ApiResponse<MyReview[]>>("/reviews/me"),

	// DELETE /reviews/:id — the review's own author can delete it
	remove: (id: string) =>
		httpClient.delete<ApiResponse<null>>(`/reviews/${id}`),
};
