import { z } from "zod";

export const tagSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	slug: z
		.string()
		.min(2, "Slug must be at least 2 characters")
		.regex(
			/^[a-z0-9-]+$/,
			"Only lowercase letters, numbers, and hyphens allowed",
		),
});

export type TagFormValues = z.infer<typeof tagSchema>;
