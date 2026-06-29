import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewApi } from "../api";

export const REVIEWS_KEY = ["owner-reviews"];

export function useReviews(approved?: boolean) {
	return useQuery({
		queryKey: [...REVIEWS_KEY, approved],
		queryFn: () => reviewApi.getAll(approved),
	});
}

export function useApproveReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => reviewApi.approve(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: REVIEWS_KEY });
			toast.success("Review approved");
		},
		onError: () => toast.error("Failed to approve review"),
	});
}

export function useDeleteReview() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => reviewApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: REVIEWS_KEY });
			toast.success("Review deleted");
		},
		onError: () => toast.error("Failed to delete review"),
	});
}
