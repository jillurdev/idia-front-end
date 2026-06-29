import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoryApi } from "../api";
import { ApiError } from "@/services/http";
import type { CreateCategoryPayload, UpdateCategoryPayload } from "../types";

export const CATEGORIES_KEY = ["owner-categories"];

export function useCategories() {
	return useQuery({
		queryKey: CATEGORIES_KEY,
		queryFn: categoryApi.getAll,
	});
}

export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateCategoryPayload) => categoryApi.create(payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
			toast.success(`Category "${data.name}" created`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Category name or slug already exists");
				return;
			}
			toast.error("Failed to create category");
		},
	});
}

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: UpdateCategoryPayload;
		}) => categoryApi.update(id, payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
			toast.success(`Category "${data.name}" updated`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Category name or slug already exists");
				return;
			}
			toast.error("Failed to update category");
		},
	});
}

export function useToggleCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoryApi.toggleActive(id),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
			toast.success(
				`"${data.name}" ${data.isActive ? "activated" : "deactivated"}`,
			);
		},
		onError: () => toast.error("Failed to update status"),
	});
}

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoryApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
			toast.success("Category deleted");
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 400) {
				toast.error(error.message); // "Cannot delete category with X products"
				return;
			}
			toast.error("Failed to delete category");
		},
	});
}
