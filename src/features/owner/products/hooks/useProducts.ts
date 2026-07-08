import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productApi } from "../api";
import { ApiError } from "@/services/httpClient";
import type {
	CreateProductPayload,
	UpdateProductPayload,
	AddImagePayload,
} from "../types";

export const PRODUCTS_KEY = ["owner-products"];

export function useProducts() {
	return useQuery({
		queryKey: PRODUCTS_KEY,
		queryFn: productApi.getAll,
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateProductPayload) => productApi.create(payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success(`"${data.title}" created`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Product slug already exists");
				return;
			}
			toast.error("Failed to create product");
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: UpdateProductPayload;
		}) => productApi.update(id, payload),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success(`"${data.title}" updated`);
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 409) {
				toast.error("Product slug already exists");
				return;
			}
			toast.error("Failed to update product");
		},
	});
}

export function useTogglePublish() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => productApi.togglePublish(id),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success(
				`"${data.title}" ${data.isPublished ? "published" : "unpublished"}`,
			);
		},
		onError: () => toast.error("Failed to update publish status"),
	});
}

export function useToggleFeature() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => productApi.toggleFeature(id),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success(
				`"${data.title}" ${data.isFeatured ? "featured" : "unfeatured"}`,
			);
		},
		onError: () => toast.error("Failed to update feature status"),
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => productApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success("Product deleted");
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 400) {
				toast.error(error.message);
				return;
			}
			toast.error("Failed to delete product");
		},
	});
}

export function useAddImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			productId,
			payload,
		}: {
			productId: string;
			payload: AddImagePayload;
		}) => productApi.addImage(productId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success("Image added");
		},
		onError: () => toast.error("Failed to add image"),
	});
}

export function useRemoveImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			productId,
			imageId,
		}: {
			productId: string;
			imageId: string;
		}) => productApi.removeImage(productId, imageId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
			toast.success("Image removed");
		},
		onError: () => toast.error("Failed to remove image"),
	});
}
