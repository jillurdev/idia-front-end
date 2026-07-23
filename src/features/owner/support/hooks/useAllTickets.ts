"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ownerSupportApi, type AdminTicketFilters } from "../api";

export function useAllTickets(filters: AdminTicketFilters) {
	return useQuery({
		queryKey: ["owner", "support-tickets", filters],
		queryFn: () => ownerSupportApi.getAll(filters),
		placeholderData: keepPreviousData,
	});
}
