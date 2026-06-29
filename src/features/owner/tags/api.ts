import { http } from "@/services/http";
import type { Tag, CreateTagPayload, UpdateTagPayload } from "./types";

export const tagApi = {
	getAll: async (): Promise<Tag[]> => {
		const res = await http.get<{ data: Tag[] }>("/tags");
		return res.data;
	},

	create: async (payload: CreateTagPayload): Promise<Tag> => {
		const res = await http.post<{ data: Tag }>("/tags", payload);
		return res.data;
	},

	update: async (id: string, payload: UpdateTagPayload): Promise<Tag> => {
		const res = await http.patch<{ data: Tag }>(`/tags/${id}`, payload);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await http.delete(`/tags/${id}`);
	},
};
