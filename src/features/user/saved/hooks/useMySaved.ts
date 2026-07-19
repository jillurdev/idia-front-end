"use client";

import { useQuery } from "@tanstack/react-query";
import { savedApi } from "../api";

export function useMySaved(enabled: boolean = true) {
	return useQuery({
		queryKey: ["user", "saved"],
		queryFn: () => savedApi.getMine(),
		select: res => res.data,
		staleTime: 30_000,
		enabled,
	});
}
