"use client";

import { useState } from "react";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useToggleCategory, useDeleteCategory } from "../hooks/useCategories";
import type { Category } from "../types";

interface CategoryTableProps {
	categories: Category[];
	onEdit: (category: Category) => void;
}

export function CategoryTable({ categories, onEdit }: CategoryTableProps) {
	const { mutate: toggle } = useToggleCategory();
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = (category: Category) => {
		if (!confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
		setDeletingId(category.id);
		deleteCategory(category.id, {
			onSettled: () => setDeletingId(null),
		});
	};

	if (categories.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No categories yet. Create your first one.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle">
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Name
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Slug
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden md:table-cell">
							Order
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
					{categories.map(cat => (
						<tr
							key={cat.id}
							className="hover:bg-surface-subtle transition-colors">
							<td className="px-4 py-3">
								<div className="flex items-center gap-2">
									{cat.icon && (
										<span className="text-base leading-none">{cat.icon}</span>
									)}
									<span className="font-medium text-text-primary">
										{cat.name}
									</span>
								</div>
							</td>
							<td className="px-4 py-3">
								<span className="font-mono text-[12px] text-text-muted bg-surface-subtle px-2 py-0.5 rounded">
									{cat.slug}
								</span>
							</td>
							<td className="px-4 py-3 text-text-muted hidden md:table-cell">
								{cat.order}
							</td>
							<td className="px-4 py-3">
								<button
									onClick={() => toggle(cat.id)}
									className="flex items-center gap-1.5 transition-colors"
									title={cat.isActive ? "Deactivate" : "Activate"}>
									{cat.isActive ? (
										<ToggleRight className="w-5 h-5 text-brand-purple" />
									) : (
										<ToggleLeft className="w-5 h-5 text-text-muted" />
									)}
									<span
										className={`text-[12px] font-medium ${
											cat.isActive ? "text-brand-purple" : "text-text-muted"
										}`}>
										{cat.isActive ? "Active" : "Inactive"}
									</span>
								</button>
							</td>
							<td className="px-4 py-3">
								<div className="flex items-center justify-end gap-1">
									<button
										onClick={() => onEdit(cat)}
										className="p-1.5 rounded-lg text-text-muted hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
										title="Edit">
										<Pencil className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => handleDelete(cat)}
										disabled={deletingId === cat.id || isDeleting}
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
