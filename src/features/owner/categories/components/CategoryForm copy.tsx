"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { categorySchema, CategoryFormValues } from "../schema";
import type { Category } from "../types";
import { uploadFile } from "@/lib/upload";

interface CategoryFormProps {
	defaultValues?: Partial<Category>;
	onSubmit: (data: CategoryFormValues) => void;
	isPending: boolean;
	onCancel: () => void;
}

export function CategoryForm({
	defaultValues,
	onSubmit,
	isPending,
	onCancel,
}: CategoryFormProps) {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: defaultValues?.name ?? "",
			slug: defaultValues?.slug ?? "",
			description: defaultValues?.description ?? "",
			coverImage: defaultValues?.coverImage ?? "",
			icon: defaultValues?.icon ?? "",
			isActive: defaultValues?.isActive ?? true,
			order: defaultValues?.order ?? 0,
		},
	});

	// Auto-generate slug from name — create mode only
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

	const isActive = watch("isActive");

	const handleFormSubmit = (data: CategoryFormValues) => {
		console.log("[CategoryForm] submit data:", data);
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{/* Name */}
			<Input
				label="Name"
				placeholder="e.g. Motion Graphics"
				error={errors.name?.message}
				{...register("name")}
			/>

			{/* Slug */}
			<Input
				label="Slug"
				placeholder="e.g. motion-graphics"
				hint="Auto-generated from name. Only lowercase letters, numbers, and hyphens."
				error={errors.slug?.message}
				className="font-mono text-[13px]"
				{...register("slug")}
			/>

			{/* Description */}
			<Input
				type="textarea"
				label="Description"
				placeholder="Short description of this category"
				showRequired={false}
				rows={3}
				error={errors.description?.message}
				{...register("description")}
			/>

			{/* Cover Image */}
			<Controller
				name="coverImage"
				control={control}
				render={({ field }) => (
					<FileUpload
						label="Cover Image"
						accept="image/*"
						maxSizeMB={5}
						showRequired={false}
						uploadFn={uploadFile}
						value={
							field.value
								? {
										url: field.value,
										name: "coverImage",
										size: 0,
										type: "image/*",
									}
								: null
						}
						onChange={v => {
							const uploaded = Array.isArray(v) ? v[0] : v;
							console.log("[CategoryForm] coverImage changed:", uploaded);
							field.onChange(uploaded?.url ?? "");
						}}
						onBlur={field.onBlur}
						error={errors.coverImage?.message}
						hint="Recommended size 1200x630"
					/>
				)}
			/>

			{/* Icon + Order */}
			<div className="grid grid-cols-2 gap-4 items-start">
				<Controller
					name="icon"
					control={control}
					render={({ field }) => (
						<FileUpload
							label="Icon"
							accept="image/*"
							maxSizeMB={2}
							showRequired={false}
							uploadFn={uploadFile}
							value={
								field.value
									? { url: field.value, name: "icon", size: 0, type: "image/*" }
									: null
							}
							onChange={v => {
								const uploaded = Array.isArray(v) ? v[0] : v;
								console.log("[CategoryForm] icon changed:", uploaded);
								field.onChange(uploaded?.url ?? "");
							}}
							onBlur={field.onBlur}
							error={errors.icon?.message}
							hint="Small square image"
						/>
					)}
				/>
				<Input
					label="Order"
					type="number"
					placeholder="0"
					hint="Lower = appears first"
					showRequired={false}
					error={errors.order?.message}
					{...register("order")}
				/>
			</div>

			{/* isActive toggle */}
			<div
				className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-surface-subtle cursor-pointer"
				onClick={() => setValue("isActive", !isActive)}>
				<div>
					<p className="text-sm font-medium text-text-primary">Active</p>
					<p className="text-[11px] text-text-muted">
						{isActive
							? "Category is visible to users"
							: "Category is hidden from users"}
					</p>
				</div>
				{/* Toggle pill */}
				<div
					className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
						isActive ? "bg-brand-purple" : "bg-border"
					}`}>
					<span
						className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
							isActive ? "translate-x-5" : "translate-x-0.5"
						}`}
					/>
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
					{defaultValues?.id ? "Update Category" : "Create Category"}
				</Button>
			</div>
		</form>
	);
}
