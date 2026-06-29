import { http } from "@/services/http";
import type { Review } from "./types";

export const reviewApi = {
	getAll: async (approved?: boolean): Promise<Review[]> => {
		const params =
			approved !== undefined ? { approved: String(approved) } : undefined;
		const res = await http.get<{ data: Review[] }>(
			"/reviews/admin/all",
			params,
		);
		return res.data;
	},

	approve: async (id: string): Promise<Review> => {
		const res = await http.patch<{ data: Review }>(
			`/reviews/${id}/approve`,
			{},
		);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await http.delete(`/reviews/${id}`);
	},
};
