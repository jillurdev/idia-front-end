"use client";

import { useQuery } from "@tanstack/react-query";
import { supportApi } from "../api";

export function useTicket(id: string, enabled: boolean = true) {
	return useQuery({
		queryKey: ["user", "support-ticket", id],
		queryFn: () => supportApi.getOne(id),
		select: res => res.data,
		enabled: enabled && !!id,
		// Ticket threads benefit from feeling "live" without a websocket —
		// short polling while the tab is open is a reasonable middle ground.
		refetchInterval: 15_000,
	});
}
