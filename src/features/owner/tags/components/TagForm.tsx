"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { tagSchema, TagFormValues } from "../schema";
import type { Tag } from "../types";

interface TagFormProps {
	defaultValues?: Partial<Tag>;
	onSubmit: (data: TagFormValues) => void;
	isPending: boolean;
	onCancel: () => void;
}

export function TagForm({
	defaultValues,
	onSubmit,
	isPending,
	onCancel,
}: TagFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TagFormValues>({
		resolver: zodResolver(tagSchema),
		defaultValues: {
			name: defaultValues?.name ?? "",
			slug: defaultValues?.slug ?? "",
		},
	});

	// Auto-generate slug — create mode only
	const nameValue = watch("name");
	useEffect(() => {
		if (defaultValues?.id) return;
		const slug = nameValue
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();
		setValue("slug", slug, { shouldValidate: !!slug });
	}, [nameValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Input
				label="Name"
				placeholder="e.g. After Effects"
				error={errors.name?.message}
				{...register("name")}
			/>

			<Input
				label="Slug"
				placeholder="e.g. after-effects"
				hint="Auto-generated from name. Only lowercase letters, numbers, and hyphens."
				error={errors.slug?.message}
				className="font-mono text-[13px]"
				{...register("slug")}
			/>

			<div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
				<Button type="button" variant="ghost" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					type="submit"
					loading={isPending}
					loadingText={defaultValues?.id ? "Updating…" : "Creating…"}>
					{defaultValues?.id ? "Update Tag" : "Create Tag"}
				</Button>
			</div>
		</form>
	);
}
