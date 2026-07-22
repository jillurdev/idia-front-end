import { httpClient } from "@/services/httpClient";
import type { CreateReviewPayload, MyReview, ProductReview } from "./types";

export const reviewsApi = {
	// GET /reviews/me — the logged-in user's own reviews (approved + pending)
	getMine: () => httpClient.get<ApiResponse<MyReview[]>>("/reviews/me"),

	// GET /reviews/product/:productId — public, approved reviews only
	getByProduct: (productId: string) =>
		httpClient.get<ApiResponse<ProductReview[]>>(
			`/reviews/product/${productId}`,
		),

	// POST /reviews — requires login + a completed purchase of the product;
	// one review per user per product. New reviews start unapproved and
	// only appear publicly once staff approves them.
	create: (payload: CreateReviewPayload) =>
		httpClient.post<ApiResponse<MyReview>>("/reviews", payload),

	// DELETE /reviews/:id — the review's own author can delete it
	remove: (id: string) =>
		httpClient.delete<ApiResponse<null>>(`/reviews/${id}`),
};
