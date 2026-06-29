import { http } from "@/services/http";
import type {
	Category,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from "./types";

export const categoryApi = {
	getAll: async (): Promise<Category[]> => {
		const res = await http.get<{ data: Category[] }>("/categories");
		return res.data;
	},

	getOne: async (id: string): Promise<Category> => {
		const res = await http.get<{ data: Category }>(`/categories/${id}`);
		return res.data;
	},

	create: async (payload: CreateCategoryPayload): Promise<Category> => {
		const res = await http.post<{ data: Category }>("/categories", payload);
		return res.data;
	},

	update: async (
		id: string,
		payload: UpdateCategoryPayload,
	): Promise<Category> => {
		const res = await http.patch<{ data: Category }>(
			`/categories/${id}`,
			payload,
		);
		return res.data;
	},

	toggleActive: async (id: string): Promise<Category> => {
		const res = await http.patch<{ data: Category }>(
			`/categories/${id}/toggle-active`,
			{},
		);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await http.delete(`/categories/${id}`);
	},
};
