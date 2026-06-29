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
	const { mutate: create, isPending: isCreating } = useCreateProduct();
	const { mutate: update, isPending: isUpdating } = useUpdateProduct();
	const { data: categories = [] } = useCategories();
	const { data: tags = [] } = useTags();

	const handleSubmit = (data: ProductFormValues) => {
		// Empty previewVideoUrl → undefined
		const payload = {
			...data,
			previewVideoUrl: data.previewVideoUrl || undefined,
		};

		if (editTarget) {
			update({ id: editTarget.id, payload }, { onSuccess: onClose });
		} else {
			create(payload, { onSuccess: onClose });
		}
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
				isPending={isCreating || isUpdating}
				onCancel={onClose}
			/>
		</Modal>
	);
}
