"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { productSchema, ProductFormValues } from "../schema";
import type { Product } from "../types";
import type { Category } from "../../categories/types";
import type { Tag } from "../../tags/types";

interface ProductFormProps {
	defaultValues?: Partial<Product>;
	categories: Category[];
	tags: Tag[];
	onSubmit: (data: ProductFormValues) => void;
	isPending: boolean;
	onCancel: () => void;
}

export function ProductForm({
	defaultValues,
	categories,
	tags,
	onSubmit,
	isPending,
	onCancel,
}: ProductFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: defaultValues?.title ?? "",
			slug: defaultValues?.slug ?? "",
			description: defaultValues?.description ?? "",
			price: defaultValues?.price ?? 0,
			categoryId: defaultValues?.categoryId ?? "",
			fileUrl: defaultValues?.fileUrl ?? "",
			thumbnailUrl: defaultValues?.thumbnailUrl ?? "",
			previewVideoUrl: defaultValues?.previewVideoUrl ?? "",
			isPublished: defaultValues?.isPublished ?? false,
			isFeatured: defaultValues?.isFeatured ?? false,
			tagIds: defaultValues?.tags?.map(t => t.tag.id) ?? [],
		},
	});

	// Auto slug from title — create mode only
	const titleValue = watch("title");
	useEffect(() => {
		if (defaultValues?.id) return;
		const slug = titleValue
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();
		setValue("slug", slug, { shouldValidate: !!slug });
	}, [titleValue]);

	const isPublished = watch("isPublished");
	const isFeatured = watch("isFeatured");
	const selectedTagIds = watch("tagIds");

	const toggleTag = (tagId: string) => {
		const current = selectedTagIds ?? [];
		const updated = current.includes(tagId)
			? current.filter(id => id !== tagId)
			: [...current, tagId];
		setValue("tagIds", updated);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			{/* Title */}
			<Input
				label="Title"
				placeholder="e.g. Cinematic Intro Pack"
				error={errors.title?.message}
				{...register("title")}
			/>

			{/* Slug */}
			<Input
				label="Slug"
				placeholder="e.g. cinematic-intro-pack"
				hint="Auto-generated from title."
				error={errors.slug?.message}
				className="font-mono text-[13px]"
				{...register("slug")}
			/>

			{/* Description */}
			<Input
				type="textarea"
				label="Description"
				placeholder="Describe the product in detail..."
				rows={4}
				error={errors.description?.message}
				{...register("description")}
			/>

			{/* Price + Category */}
			<div className="grid grid-cols-2 gap-4">
				<Input
					label="Price"
					type="number"
					placeholder="0"
					hint="Set 0 for free"
					prefix="$"
					error={errors.price?.message}
					{...register("price")}
				/>

				{/* Category select */}
				<div className="flex flex-col gap-1.5">
					<label className="text-[12px] font-medium text-text-primary flex items-center gap-1">
						Category
						<span className="text-red-500 text-sm leading-none">*</span>
					</label>
					<select
						{...register("categoryId")}
						className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-text-primary text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10">
						<option value="">Select category</option>
						{categories.map(cat => (
							<option key={cat.id} value={cat.id}>
								{cat.icon ? `${cat.icon} ` : ""}
								{cat.name}
							</option>
						))}
					</select>
					{errors.categoryId && (
						<p className="text-[11px] text-red-500 flex items-center gap-1">
							<span>✗</span> {errors.categoryId.message}
						</p>
					)}
				</div>
			</div>

			{/* File URL + Thumbnail URL */}
			<Input
				label="File URL"
				placeholder="https://storage.example.com/file.zip"
				hint="Direct download link for the product file"
				error={errors.fileUrl?.message}
				{...register("fileUrl")}
			/>

			<Input
				label="Thumbnail URL"
				placeholder="https://cdn.example.com/thumbnail.jpg"
				error={errors.thumbnailUrl?.message}
				{...register("thumbnailUrl")}
			/>

			<Input
				label="Preview Video URL"
				placeholder="https://youtube.com/watch?v=..."
				showRequired={false}
				error={errors.previewVideoUrl?.message}
				{...register("previewVideoUrl")}
			/>

			{/* Tags */}
			{tags.length > 0 && (
				<div className="flex flex-col gap-1.5">
					<label className="text-[12px] font-medium text-text-primary flex items-center gap-1">
						Tags
						<span className="text-[11px] text-text-muted font-normal">
							(optional)
						</span>
					</label>
					<div className="flex flex-wrap gap-2">
						{tags.map(tag => {
							const selected = selectedTagIds?.includes(tag.id);
							return (
								<button
									key={tag.id}
									type="button"
									onClick={() => toggleTag(tag.id)}
									className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all duration-150 ${
										selected
											? "bg-brand-purple text-white border-brand-purple"
											: "bg-surface text-text-muted border-border hover:border-brand-purple hover:text-brand-purple"
									}`}>
									# {tag.name}
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Publish + Feature toggles */}
			<div className="grid grid-cols-2 gap-3">
				<div
					className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-surface-subtle cursor-pointer"
					onClick={() => setValue("isPublished", !isPublished)}>
					<div>
						<p className="text-[12px] font-medium text-text-primary">
							Published
						</p>
						<p className="text-[11px] text-text-muted">
							{isPublished ? "Visible to users" : "Hidden"}
						</p>
					</div>
					<div
						className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${isPublished ? "bg-brand-purple" : "bg-border"}`}>
						<span
							className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isPublished ? "translate-x-4" : "translate-x-0.5"}`}
						/>
					</div>
				</div>

				<div
					className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-surface-subtle cursor-pointer"
					onClick={() => setValue("isFeatured", !isFeatured)}>
					<div>
						<p className="text-[12px] font-medium text-text-primary">
							Featured
						</p>
						<p className="text-[11px] text-text-muted">
							{isFeatured ? "On homepage" : "Not featured"}
						</p>
					</div>
					<div
						className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${isFeatured ? "bg-brand-cyan" : "bg-border"}`}>
						<span
							className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isFeatured ? "translate-x-4" : "translate-x-0.5"}`}
						/>
					</div>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
				<Button type="button" variant="ghost" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					type="submit"
					loading={isPending}
					loadingText={defaultValues?.id ? "Updating…" : "Creating…"}>
					{defaultValues?.id ? "Update Product" : "Create Product"}
				</Button>
			</div>
		</form>
	);
}
