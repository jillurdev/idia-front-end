"use client";

import { useState } from "react";
import { Pencil, Trash2, Eye, Star, Globe, EyeOff } from "lucide-react";
import {
	useTogglePublish,
	useToggleFeature,
	useDeleteProduct,
} from "../hooks/useProducts";
import type { Product } from "../types";

interface ProductTableProps {
	products: Product[];
	onEdit: (product: Product) => void;
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
	const { mutate: togglePublish } = useTogglePublish();
	const { mutate: toggleFeature } = useToggleFeature();
	const { mutate: deleteProduct } = useDeleteProduct();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = (product: Product) => {
		if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
		setDeletingId(product.id);
		deleteProduct(product.id, { onSettled: () => setDeletingId(null) });
	};

	if (products.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No products yet. Create your first one.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle">
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Product
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden md:table-cell">
							Category
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Price
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Views
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Status
						</th>
						<th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border bg-surface">
					{products.map(product => (
						<tr
							key={product.id}
							className="hover:bg-surface-subtle transition-colors">
							{/* Product */}
							<td className="px-4 py-3">
								<div className="flex items-center gap-3">
									{product.thumbnailUrl ? (
										<img
											src={product.thumbnailUrl}
											alt={product.title}
											className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
										/>
									) : (
										<div className="w-10 h-10 rounded-lg bg-surface-muted flex-shrink-0" />
									)}
									<div>
										<p className="font-medium text-text-primary text-[13px] line-clamp-1">
											{product.title}
										</p>
										<p className="font-mono text-[11px] text-text-muted">
											{product.slug}
										</p>
									</div>
								</div>
							</td>

							{/* Category */}
							<td className="px-4 py-3 hidden md:table-cell">
								<span className="text-[12px] text-text-muted">
									{product.category?.icon} {product.category?.name}
								</span>
							</td>

							{/* Price */}
							<td className="px-4 py-3">
								<span className="text-[13px] font-medium text-text-primary">
									{product.price === 0 ? (
										<span className="text-brand-cyan-dark font-semibold">
											Free
										</span>
									) : (
										`$${product.price.toFixed(2)}`
									)}
								</span>
							</td>

							{/* Views */}
							<td className="px-4 py-3 hidden lg:table-cell">
								<div className="flex items-center gap-1 text-text-muted text-[12px]">
									<Eye className="w-3.5 h-3.5" />
									{product.viewCount.toLocaleString()}
								</div>
							</td>

							{/* Status badges */}
							<td className="px-4 py-3">
								<div className="flex items-center gap-1.5">
									<button
										onClick={() => togglePublish(product.id)}
										title={product.isPublished ? "Unpublish" : "Publish"}
										className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
											product.isPublished
												? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
												: "bg-surface-muted text-text-muted hover:bg-border"
										}`}>
										{product.isPublished ? (
											<Globe className="w-3 h-3" />
										) : (
											<EyeOff className="w-3 h-3" />
										)}
										{product.isPublished ? "Live" : "Draft"}
									</button>

									<button
										onClick={() => toggleFeature(product.id)}
										title={product.isFeatured ? "Unfeature" : "Feature"}
										className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
											product.isFeatured
												? "bg-amber-50 text-amber-600 hover:bg-amber-100"
												: "bg-surface-muted text-text-muted hover:bg-border"
										}`}>
										<Star className="w-3 h-3" />
										{product.isFeatured ? "Featured" : "Normal"}
									</button>
								</div>
							</td>

							{/* Actions */}
							<td className="px-4 py-3">
								<div className="flex items-center justify-end gap-1">
									<button
										onClick={() => onEdit(product)}
										className="p-1.5 rounded-lg text-text-muted hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
										title="Edit">
										<Pencil className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => handleDelete(product)}
										disabled={deletingId === product.id}
										className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
										title="Delete">
										<Trash2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
