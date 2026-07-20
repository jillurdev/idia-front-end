"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../api";

export function useMyReviews() {
	return useQuery({
		queryKey: ["user", "reviews"],
		queryFn: () => reviewsApi.getMine(),
		select: res => res.data,
		staleTime: 30_000,
	});
}
