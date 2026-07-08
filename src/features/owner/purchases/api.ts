import { httpClient } from "@/services/httpClient";
import type { Purchase } from "./types";

export const purchaseApi = {
	getAll: async (): Promise<Purchase[]> => {
		const res = await httpClient.get<{ data: Purchase[] }>(
			"/purchases/admin/all",
		);
		return res.data;
	},

	getOne: async (id: string): Promise<Purchase> => {
		const res = await httpClient.get<{ data: Purchase }>(`/purchases/${id}`);
		return res.data;
	},
};
