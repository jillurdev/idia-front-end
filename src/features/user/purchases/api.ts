import { apiClient } from "@/services/http";
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
		apiClient.post<PurchaseResponse>("/purchases", payload),
	getMyPurchases: () => apiClient.get<Purchase[]>("/purchases/my"),
	downloadProduct: (purchaseId: string) =>
		apiClient.get<{ downloadUrl: string }>(`/purchases/${purchaseId}/download`),
};
