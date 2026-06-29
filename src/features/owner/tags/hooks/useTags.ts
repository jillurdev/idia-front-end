import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { tagApi } from "../api";
import { ApiError } from "@/services/http";
import type { CreateTagPayload, UpdateTagPayload } from "../types";

export const TAGS_KEY = ["owner-tags"];

export function useTags() {
	return useQuery({
		queryKey: TAGS_KEY,
		queryFn: tagApi.getAll,
	});
}

export function useCreateTag() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateTagPayload) => tagApi.create(payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: TAGS_KEY });
			toast.success(`Tag "${data.name}" created`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Tag name or slug already exists");
				return;
			}
			toast.error("Failed to create tag");
		},
	});
}

export function useUpdateTag() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateTagPayload }) =>
			tagApi.update(id, payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: TAGS_KEY });
			toast.success(`Tag "${data.name}" updated`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Tag name or slug already exists");
				return;
			}
			toast.error("Failed to update tag");
		},
	});
}

export function useDeleteTag() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => tagApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TAGS_KEY });
			toast.success("Tag deleted");
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 400) {
				toast.error(error.message); // "Cannot delete tag used by X products"
				return;
			}
			toast.error("Failed to delete tag");
		},
	});
}
