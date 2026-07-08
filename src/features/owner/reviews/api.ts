import { httpClient } from "@/services/httpClient";
import type { Review } from "./types";

export const reviewApi = {
	getAll: async (approved?: boolean): Promise<Review[]> => {
		const params =
			approved !== undefined ? { approved: String(approved) } : undefined;
		const res = await httpClient.get<{ data: Review[] }>(
			"/reviews/admin/all",
			params,
		);
		return res.data;
	},

	approve: async (id: string): Promise<Review> => {
		const res = await httpClient.patch<{ data: Review }>(
			`/reviews/${id}/approve`,
			{},
		);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await httpClient.delete(`/reviews/${id}`);
	},
};
