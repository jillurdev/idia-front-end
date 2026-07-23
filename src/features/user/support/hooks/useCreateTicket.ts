"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supportApi } from "../api";
import type { CreateTicketPayload } from "../types";

export function useCreateTicket() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (payload: CreateTicketPayload) => supportApi.create(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", "support-tickets"] });
			toast.success("Ticket submitted — we'll get back to you soon");
		},
		onError: (err: unknown) => {
			const message = err instanceof Error ? err.message : "Something went wrong";
			toast.error(message);
		},
	});

	return {
		createTicket: (payload: CreateTicketPayload) => mutation.mutateAsync(payload),
		isCreating: mutation.isPending,
	};
}
