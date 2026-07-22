"use client";

import { useQuery } from "@tanstack/react-query";
import { purchasesApi } from "../api";

export function useMyPurchases(enabled: boolean = true) {
	return useQuery({
		queryKey: ["user", "purchases"],
		queryFn: () => purchasesApi.getMine(),
		select: res => res.data,
		staleTime: 30_000,
		enabled,
	});
}
