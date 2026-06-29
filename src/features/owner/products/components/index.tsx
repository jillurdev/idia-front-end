"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useProducts } from "@/features/owner/products/hooks/useProducts";
import { ProductModal } from "@/features/owner/products/components/ProductModal";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/features/owner/products/types";
import { ProductTable } from "./ProductTable";

export default function Products() {
	const { data: products = [], isLoading } = useProducts();
	const [modalOpen, setModalOpen] = useState(false);
	const [editTarget, setEditTarget] = useState<Product | null>(null);

	const openCreate = () => {
		setEditTarget(null);
		setModalOpen(true);
	};

	const openEdit = (product: Product) => {
		setEditTarget(product);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditTarget(null);
	};

	// Stats
	const published = products.filter(p => p.isPublished).length;
	const featured = products.filter(p => p.isFeatured).length;
	const free = products.filter(p => p.price === 0).length;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-serif text-2xl font-semibold text-brand-navy">
						Products
					</h1>
					<p className="text-sm text-text-muted mt-0.5">
						{products.length} total · {published} published · {featured}{" "}
						featured · {free} free
					</p>
				</div>
				<Button leftIcon={<Plus className="w-4 h-4" />} onClick={openCreate}>
					New Product
				</Button>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<ProductTable products={products} onEdit={openEdit} />
			)}

			{/* Modal */}
			<ProductModal
				open={modalOpen}
				editTarget={editTarget}
				onClose={closeModal}
			/>
		</div>
	);
}
