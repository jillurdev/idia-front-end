import { httpClient } from "@/services/httpClient";
import { SavedItem } from "./types";

export const savedApi = {
	getMySaved: () => httpClient.get<SavedItem[]>("/saved/my"),
	removeFromSaved: (productId: string) =>
		httpClient.delete<void>(`/saved/${productId}`),
};
