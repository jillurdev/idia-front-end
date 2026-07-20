"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewsApi } from "../api";

export function useDeleteReview() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (id: string) => reviewsApi.remove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", "reviews"] });
			toast.success("Review deleted");
		},
		onError: (err: unknown) => {
			toast.error(
				err instanceof Error ? err.message : "Could not delete review",
			);
		},
	});

	return {
		deleteReview: (id: string) => mutation.mutate(id),
		isDeleting: mutation.isPending,
		deletingId: mutation.isPending ? mutation.variables : null,
	};
}
