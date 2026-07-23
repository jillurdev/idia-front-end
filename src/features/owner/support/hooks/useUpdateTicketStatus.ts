"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ownerSupportApi } from "../api";
import type { TicketStatus } from "@/features/user/support/types";

export function useUpdateTicketStatus(ticketId: string) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (status: TicketStatus) =>
			ownerSupportApi.updateStatus(ticketId, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["owner", "support-tickets"] });
			queryClient.invalidateQueries({
				queryKey: ["user", "support-ticket", ticketId],
			});
			toast.success("Ticket status updated");
		},
		onError: (err: unknown) => {
			const message = err instanceof Error ? err.message : "Something went wrong";
			toast.error(message);
		},
	});

	return {
		updateStatus: (status: TicketStatus) => mutation.mutate(status),
		isUpdating: mutation.isPending,
	};
}
