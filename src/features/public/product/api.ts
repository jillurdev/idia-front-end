import { httpClient } from "@/services/httpClient";
import type { PaginatedApiResponse } from "@/types/paginated-response";
import type { Product, ProductFilters } from "./types";

export const productsApi = {
	// GET /products — public, published-only, paginated
	getAll: (filters: ProductFilters) =>
		httpClient.get<PaginatedApiResponse<Product>>("/products", filters),

	// GET /products/slug/:slug — public, increments viewCount server-side
	getBySlug: (slug: string) =>
		httpClient.get<ApiResponse<Product>>(`/products/slug/${slug}`),
};
