"use client";

import { Modal } from "@/components/ui/Modal";
import { TagForm } from "./TagForm";
import { useCreateTag, useUpdateTag } from "../hooks/useTags";
import type { Tag } from "../types";
import type { TagFormValues } from "../schema";

interface TagModalProps {
	open: boolean;
	editTarget: Tag | null;
	onClose: () => void;
}

export function TagModal({ open, editTarget, onClose }: TagModalProps) {
	const { mutate: create, isPending: isCreating } = useCreateTag();
	const { mutate: update, isPending: isUpdating } = useUpdateTag();

	const handleSubmit = (data: TagFormValues) => {
		if (editTarget) {
			update({ id: editTarget.id, payload: data }, { onSuccess: onClose });
		} else {
			create(data, { onSuccess: onClose });
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			size="sm"
			title={editTarget ? "Edit Tag" : "New Tag"}
			description={
				editTarget
					? "Update tag details"
					: "Tags help users find related products"
			}>
			<TagForm
				defaultValues={editTarget ?? undefined}
				onSubmit={handleSubmit}
				isPending={isCreating || isUpdating}
				onCancel={onClose}
			/>
		</Modal>
	);
}
