"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { savedApi } from "../api";

export function useToggleSaved() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (productId: string) => savedApi.toggle(productId),
		onSuccess: res => {
			queryClient.invalidateQueries({ queryKey: ["user", "saved"] });
			toast.success(res.data.saved ? "Saved" : "Removed from saved");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof Error ? err.message : "Something went wrong";
			toast.error(message);
		},
	});

	return {
		toggle: (productId: string) => mutation.mutate(productId),
		isToggling: mutation.isPending,
		togglingId: mutation.isPending ? mutation.variables : null,
	};
}
