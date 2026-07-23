"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supportApi } from "../api";

export function useReplyTicket(ticketId: string) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (body: string) => supportApi.reply(ticketId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user", "support-ticket", ticketId],
			});
			queryClient.invalidateQueries({ queryKey: ["user", "support-tickets"] });
		},
		onError: (err: unknown) => {
			const message = err instanceof Error ? err.message : "Something went wrong";
			toast.error(message);
		},
	});

	return {
		sendReply: (body: string) => mutation.mutateAsync(body),
		isSending: mutation.isPending,
	};
}
