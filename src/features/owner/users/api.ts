import { httpClient } from "@/services/httpClient";
import type { AdminUser } from "./types";

export const adminUserApi = {
	getAll: async (): Promise<AdminUser[]> => {
		const res = await httpClient.get<{ data: AdminUser[] }>("/users");
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await httpClient.delete(`/users/${id}`);
	},
};
