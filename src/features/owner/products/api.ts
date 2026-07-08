import { httpClient } from "@/services/httpClient";
import type {
	Product,
	CreateProductPayload,
	UpdateProductPayload,
	AddImagePayload,
	ProductImage,
} from "./types";

export const productApi = {
	getAll: async (): Promise<Product[]> => {
		const res = await httpClient.get<{ data: Product[] }>(
			"/products/admin/all",
		);
		return res.data;
	},

	getOne: async (id: string): Promise<Product> => {
		const res = await httpClient.get<{ data: Product }>(`/products/${id}`);
		return res.data;
	},

	create: async (payload: CreateProductPayload): Promise<Product> => {
		const res = await httpClient.post<{ data: Product }>("/products", payload);
		return res.data;
	},

	update: async (
		id: string,
		payload: UpdateProductPayload,
	): Promise<Product> => {
		const res = await httpClient.patch<{ data: Product }>(
			`/products/${id}`,
			payload,
		);
		return res.data;
	},

	togglePublish: async (id: string): Promise<Product> => {
		const res = await httpClient.patch<{ data: Product }>(
			`/products/${id}/toggle-publish`,
			{},
		);
		return res.data;
	},

	toggleFeature: async (id: string): Promise<Product> => {
		const res = await httpClient.patch<{ data: Product }>(
			`/products/${id}/toggle-feature`,
			{},
		);
		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await httpClient.delete(`/products/${id}`);
	},

	addImage: async (
		productId: string,
		payload: AddImagePayload,
	): Promise<ProductImage> => {
		const res = await httpClient.post<{ data: ProductImage }>(
			`/products/${productId}/images`,
			payload,
		);
		return res.data;
	},

	removeImage: async (productId: string, imageId: string): Promise<void> => {
		await httpClient.delete(`/products/${productId}/images/${imageId}`);
	},
};
