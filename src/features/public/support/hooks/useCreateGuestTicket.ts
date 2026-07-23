"use client";

import { useMutation } from "@tanstack/react-query";
import { guestSupportApi } from "../api";
import type { CreateGuestTicketPayload } from "@/features/user/support/types";

export function useCreateGuestTicket() {
	const mutation = useMutation({
		mutationFn: (payload: CreateGuestTicketPayload) =>
			guestSupportApi.create(payload),
	});

	return {
		submit: (payload: CreateGuestTicketPayload) => mutation.mutateAsync(payload),
		isSubmitting: mutation.isPending,
		isSuccess: mutation.isSuccess,
		reset: mutation.reset,
	};
}
