import { z } from "zod";

export const categorySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	slug: z
		.string()
		.min(2, "Slug must be at least 2 characters")
		.regex(
			/^[a-z0-9-]+$/,
			"Slug can only contain lowercase letters, numbers, and hyphens",
		),
	description: z.string().optional(),
	icon: z.string().optional(),
	coverImage: z.string().optional(),
	isActive: z.boolean().default(true),
	order: z.coerce.number().default(0),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
