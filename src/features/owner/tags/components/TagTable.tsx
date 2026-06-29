"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteTag } from "../hooks/useTags";
import type { Tag } from "../types";

interface TagTableProps {
	tags: Tag[];
	onEdit: (tag: Tag) => void;
}

export function TagTable({ tags, onEdit }: TagTableProps) {
	const { mutate: deleteTag } = useDeleteTag();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = (tag: Tag) => {
		if (!confirm(`Delete tag "${tag.name}"?`)) return;
		setDeletingId(tag.id);
		deleteTag(tag.id, { onSettled: () => setDeletingId(null) });
	};

	if (tags.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No tags yet. Create your first one.</p>
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
							Created
						</th>
						<th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border bg-surface">
					{tags.map(tag => (
						<tr
							key={tag.id}
							className="hover:bg-surface-subtle transition-colors">
							<td className="px-4 py-3">
								<span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-brand-purple/10 text-brand-purple-dark">
									# {tag.name}
								</span>
							</td>
							<td className="px-4 py-3">
								<span className="font-mono text-[12px] text-text-muted bg-surface-subtle px-2 py-0.5 rounded">
									{tag.slug}
								</span>
							</td>
							<td className="px-4 py-3 text-text-muted text-[12px] hidden md:table-cell">
								{new Date(tag.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
							<td className="px-4 py-3">
								<div className="flex items-center justify-end gap-1">
									<button
										onClick={() => onEdit(tag)}
										className="p-1.5 rounded-lg text-text-muted hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
										title="Edit">
										<Pencil className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => handleDelete(tag)}
										disabled={deletingId === tag.id}
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
