import { http } from "@/services/http";
import type { Purchase } from "./types";

export const purchaseApi = {
	getAll: async (): Promise<Purchase[]> => {
		const res = await http.get<{ data: Purchase[] }>("/purchases/admin/all");
		return res.data;
	},

	getOne: async (id: string): Promise<Purchase> => {
		const res = await http.get<{ data: Purchase }>(`/purchases/${id}`);
		return res.data;
	},
};
