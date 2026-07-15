import { httpClient } from "@/services/httpClient";
import type { Product, ProductFilters } from "./types";

export const productsApi = {
	// GET /products — public, published-only, filters: categoryId, isFeatured
	getAll: (filters?: ProductFilters) =>
		httpClient.get<ApiResponse<Product[]>>("/products", filters),

	// GET /products/slug/:slug — public, increments viewCount server-side
	getBySlug: (slug: string) =>
		httpClient.get<ApiResponse<Product>>(`/products/slug/${slug}`),
};
