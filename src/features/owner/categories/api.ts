import { httpClient } from "@/services/httpClient";

import type {
	Category,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from "./types";

export const categoryApi = {
	getAll: async (): Promise<Category[]> => {
		const res = await httpClient.get<{ data: Category[] }>("/categories");
		return res.data;
	},

	getOne: async (id: string): Promise<Category> => {
		const res = await httpClient.get<{ data: Category }>(`/categories/${id}`);
		return res.data;
	},

	create: async (payload: CreateCategoryPayload): Promise<Category> => {
		const res = await httpClient.post<{ data: Category }>(
			"/categories",
			payload,
		);
		return res.data;
	},

	update: async (
		id: string,
		payload: UpdateCategoryPayload,
	): Promise<Category> => {
		const res = await httpClient.patch<{ data: Category }>(
			`/categories/${id}`,
			payload,
		);
		return res.data;
	},

	toggleActive: async (id: string): Promise<Category> => {
		const res = await httpClient.patch<{ data: Category }>(
			`/categories/${id}/toggle-active`,
			{},
		);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await httpClient.delete(`/categories/${id}`);
	},
};
