"use client";

import { Modal } from "@/components/ui/Modal";
import { ProductForm } from "./ProductForm";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProducts";
import { useCategories } from "../../categories/hooks/useCategories";
import { useTags } from "../../tags/hooks/useTags";
import type { Product } from "../types";
import type { ProductFormValues } from "../schema";

interface ProductModalProps {
	open: boolean;
	editTarget: Product | null;
	onClose: () => void;
}

export function ProductModal({ open, editTarget, onClose }: ProductModalProps) {
	const { mutateAsync: create, isPending: isCreating } = useCreateProduct();
	const { mutateAsync: update, isPending: isUpdating } = useUpdateProduct();
	const { data: categories = [] } = useCategories();
	const { data: tags = [] } = useTags();

	const handleSubmit = async (data: ProductFormValues) => {
		// Empty previewVideoUrl → undefined
		const payload = {
			...data,
			previewVideoUrl: data.previewVideoUrl || undefined,
		};

		if (editTarget) {
			return update({ id: editTarget.id, payload });
		}
		return create(payload);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			size="lg"
			title={editTarget ? "Edit Product" : "New Product"}
			description={
				editTarget
					? "Update product details"
					: "Fill in the details for the new product"
			}>
			<ProductForm
				defaultValues={editTarget ?? undefined}
				categories={categories}
				tags={tags}
				onSubmit={handleSubmit}
				onComplete={onClose}
				isPending={isCreating || isUpdating}
				onCancel={onClose}
			/>
		</Modal>
	);
}
