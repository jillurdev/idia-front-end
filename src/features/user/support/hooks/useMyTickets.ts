"use client";

import { useQuery } from "@tanstack/react-query";
import { supportApi } from "../api";

export function useMyTickets(page: number, limit: number = 10) {
	return useQuery({
		queryKey: ["user", "support-tickets", page, limit],
		queryFn: () => supportApi.getMine({ page, limit }),
		staleTime: 15_000,
	});
}
