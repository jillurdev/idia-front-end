import { http } from "@/services/http";
import type { AdminUser } from "./types";

export const adminUserApi = {
	getAll: async (): Promise<AdminUser[]> => {
		const res = await http.get<{ data: AdminUser[] }>("/users");
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await http.delete(`/users/${id}`);
	},
};
