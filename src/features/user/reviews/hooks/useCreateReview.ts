"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/services/httpClient";
import { reviewsApi } from "../api";
import type { CreateReviewPayload } from "../types";

export function useCreateReview() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (payload: CreateReviewPayload) => reviewsApi.create(payload),
		onSuccess: (_res, payload) => {
			queryClient.invalidateQueries({
				queryKey: ["reviews", "product", payload.productId],
			});
			queryClient.invalidateQueries({ queryKey: ["user", "reviews"] });
			toast.success("Review submitted — it'll appear once approved.");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof ApiError
					? err.message
					: err instanceof Error
						? err.message
						: "Could not submit review";
			toast.error(message);
		},
	});

	return {
		createReview: (payload: CreateReviewPayload) =>
			mutation.mutateAsync(payload),
		isSubmitting: mutation.isPending,
	};
}
