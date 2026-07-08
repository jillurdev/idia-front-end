import { httpClient } from "@/services/httpClient";
import { ProductsResponse } from "@/types/product";

export interface GetProductsParams {
	search?: string;
	category?: string;
	tag?: string;
	sort?: string;
	page?: number;
	limit?: number;
	[key: string]: string | number | boolean | null | undefined;
}

export const productsApi = {
	getProducts: (params?: GetProductsParams) =>
		httpClient.get<ProductsResponse>("/products", params),
};
