"use client";

import { X } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { useCreateCategory, useUpdateCategory } from "../hooks/useCategories";
import type { Category } from "../types";
import type { CategoryFormValues } from "../schema";

interface CategoryModalProps {
	open: boolean;
	editTarget: Category | null;
	onClose: () => void;
}

export function CategoryModal({
	open,
	editTarget,
	onClose,
}: CategoryModalProps) {
	const { mutate: create, isPending: isCreating } = useCreateCategory();
	const { mutate: update, isPending: isUpdating } = useUpdateCategory();

	if (!open) return null;

	const handleSubmit = (data: CategoryFormValues) => {
		if (editTarget) {
			update({ id: editTarget.id, payload: data }, { onSuccess: onClose });
		} else {
			create(data, { onSuccess: onClose });
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-brand-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative w-full max-w-lg bg-surface rounded-xl shadow-xl border border-border animate-fade-up">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-border">
					<h2 className="font-serif text-lg font-semibold text-brand-navy">
						{editTarget ? "Edit Category" : "New Category"}
					</h2>
					<button
						onClick={onClose}
						className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors">
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* Body */}
				<div className="px-6 py-5">
					<CategoryForm
						defaultValues={editTarget ?? undefined}
						onSubmit={handleSubmit}
						isPending={isCreating || isUpdating}
						onCancel={onClose}
					/>
				</div>
			</div>
		</div>
	);
}
