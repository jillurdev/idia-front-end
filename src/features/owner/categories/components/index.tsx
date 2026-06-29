"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategories } from "@/features/owner/categories/hooks/useCategories";
import { CategoryTable } from "@/features/owner/categories/components/CategoryTable";
import { CategoryModal } from "@/features/owner/categories/components/CategoryModal";
import type { Category } from "@/features/owner/categories/types";

export default function Categories() {
	const { data: categories = [], isLoading } = useCategories();
	const [modalOpen, setModalOpen] = useState(false);
	const [editTarget, setEditTarget] = useState<Category | null>(null);

	const openCreate = () => {
		setEditTarget(null);
		setModalOpen(true);
	};

	const openEdit = (category: Category) => {
		setEditTarget(category);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditTarget(null);
	};

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-serif text-2xl font-semibold text-brand-navy">
						Categories
					</h1>
					<p className="text-sm text-text-muted mt-0.5">
						{categories.length}{" "}
						{categories.length === 1 ? "category" : "categories"} total
					</p>
				</div>
				<button
					onClick={openCreate}
					className="flex items-center gap-2 px-4 py-2.5 bg-brand-purple text-white text-sm font-medium rounded-lg hover:bg-brand-purple-dark transition-colors">
					<Plus className="w-4 h-4" />
					New Category
				</button>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<CategoryTable categories={categories} onEdit={openEdit} />
			)}

			{/* Modal */}
			<CategoryModal
				open={modalOpen}
				editTarget={editTarget}
				onClose={closeModal}
			/>
		</div>
	);
}
