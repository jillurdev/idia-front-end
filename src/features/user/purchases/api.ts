import { http } from "@/services/http";
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
		http.post<PurchaseResponse>("/purchases", payload),
	getMyPurchases: () => http.get<Purchase[]>("/purchases/my"),
	downloadProduct: (purchaseId: string) =>
		http.get<{ downloadUrl: string }>(`/purchases/${purchaseId}/download`),
};
