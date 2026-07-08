import { z } from "zod";

export const emailLogFilterSchema = z.object({
	search: z.string().optional(),
	status: z.enum(["ALL", "SENT", "FAILED", "PENDING"]).optional(),
	template: z.string().optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
});

export type EmailLogFilterInput = z.infer<typeof emailLogFilterSchema>;

export const sendEmailSchema = z
	.object({
		subject: z.string().min(1, "Subject আবশ্যক"),
		body: z.string().min(1, "Message আবশ্যক"),
		recipientType: z.enum([
			"SINGLE",
			"CUSTOM",
			"ALL",
			"CUSTOMERS",
			"NON_CUSTOMERS",
			"SPECIFIC_CATEGORY",
		]),
		categoryId: z.string().optional(),
		userIds: z.array(z.string()).optional(),
	})
	.refine(
		data =>
			!["SINGLE", "CUSTOM"].includes(data.recipientType) ||
			(data.userIds && data.userIds.length > 0),
		{ message: "অন্তত একজন recipient বেছে নিতে হবে", path: ["userIds"] },
	)
	.refine(
		data => data.recipientType !== "SPECIFIC_CATEGORY" || !!data.categoryId,
		{ message: "Category বেছে নিতে হবে", path: ["categoryId"] },
	);

export type SendEmailInput = z.infer<typeof sendEmailSchema>;
