import { httpClient } from "@/services/httpClient";
import { Purchase } from "./types";

export interface CreatePurchasePayload {
	productId: string;
	quantity: number;
}

export interface PurchaseResponse {
	id: string;
	productId: string;
	userId: string;
	quantity: number;
	status: string;
	createdAt: string;
}

export const purchasesApi = {
	createPurchase: (payload: CreatePurchasePayload) =>
		httpClient.post<PurchaseResponse>("/purchases", payload),
	getMyPurchases: () => httpClient.get<Purchase[]>("/purchases/my"),
	downloadProduct: (purchaseId: string) =>
		httpClient.get<{ downloadUrl: string }>(
			`/purchases/${purchaseId}/download`,
		),
};
