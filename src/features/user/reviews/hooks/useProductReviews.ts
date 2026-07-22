"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../api";

export function useProductReviews(productId: string) {
	return useQuery({
		queryKey: ["reviews", "product", productId],
		queryFn: () => reviewsApi.getByProduct(productId),
		select: res => res.data,
		enabled: !!productId,
		staleTime: 30_000,
	});
}
