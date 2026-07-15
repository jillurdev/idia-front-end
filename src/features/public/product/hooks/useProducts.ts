import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productsApi } from "../api";
import type { ProductFilters } from "../types";

export function useProducts(filters: ProductFilters) {
	return useQuery({
		queryKey: ["public", "products", filters],
		queryFn: () => productsApi.getAll(filters),
		select: res => ({ products: res.data, meta: res.meta }),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	});
}

export function useProductBySlug(slug: string) {
	return useQuery({
		queryKey: ["public", "product", slug],
		queryFn: () => productsApi.getBySlug(slug),
		select: res => res.data,
		enabled: !!slug,
		staleTime: 60_000,
	});
}
