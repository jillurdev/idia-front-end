import { httpClient } from "@/services/httpClient";
import type { Tag, CreateTagPayload, UpdateTagPayload } from "./types";

export const tagApi = {
	getAll: async (): Promise<Tag[]> => {
		const res = await httpClient.get<{ data: Tag[] }>("/tags");
		return res.data;
	},

	create: async (payload: CreateTagPayload): Promise<Tag> => {
		const res = await httpClient.post<{ data: Tag }>("/tags", payload);
		return res.data;
	},

	update: async (id: string, payload: UpdateTagPayload): Promise<Tag> => {
		const res = await httpClient.patch<{ data: Tag }>(`/tags/${id}`, payload);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await httpClient.delete(`/tags/${id}`);
	},
};
