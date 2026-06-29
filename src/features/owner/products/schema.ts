import { z } from "zod";

export const productSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z
		.string()
		.min(3, "Slug must be at least 3 characters")
		.regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	price: z.coerce.number().min(0, "Price must be 0 or more"),
	categoryId: z.string().min(1, "Please select a category"),
	fileUrl: z.string().url("Must be a valid URL"),
	thumbnailUrl: z.string().url("Must be a valid URL"),
	previewVideoUrl: z
		.string()
		.url("Must be a valid URL")
		.optional()
		.or(z.literal("")),
	isPublished: z.boolean().default(false),
	isFeatured: z.boolean().default(false),
	tagIds: z.array(z.string()).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
