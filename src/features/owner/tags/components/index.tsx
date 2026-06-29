"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTags } from "@/features/owner/tags/hooks/useTags";
import { TagTable } from "@/features/owner/tags/components/TagTable";
import { TagModal } from "@/features/owner/tags/components/TagModal";
import { Button } from "@/components/ui/Button";
import type { Tag } from "@/features/owner/tags/types";

export default function Tags() {
	const { data: tags = [], isLoading } = useTags();
	const [modalOpen, setModalOpen] = useState(false);
	const [editTarget, setEditTarget] = useState<Tag | null>(null);

	const openCreate = () => {
		setEditTarget(null);
		setModalOpen(true);
	};

	const openEdit = (tag: Tag) => {
		setEditTarget(tag);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditTarget(null);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-serif text-2xl font-semibold text-brand-navy">
						Tags
					</h1>
					<p className="text-sm text-text-muted mt-0.5">
						{tags.length} {tags.length === 1 ? "tag" : "tags"} total
					</p>
				</div>
				<Button leftIcon={<Plus className="w-4 h-4" />} onClick={openCreate}>
					New Tag
				</Button>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<TagTable tags={tags} onEdit={openEdit} />
			)}

			{/* Modal */}
			<TagModal open={modalOpen} editTarget={editTarget} onClose={closeModal} />
		</div>
	);
}
