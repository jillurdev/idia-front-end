import { z } from "zod";

export const generalSettingsSchema = z.object({
	siteName: z.string().min(2, "সাইটের নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
	siteLogo: z.string().url("সঠিক URL দিন").or(z.literal("")),
	contactEmail: z.string().email("সঠিক ইমেইল দিন"),
	contactPhone: z.string().min(6, "সঠিক ফোন নম্বর দিন"),
});
export type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;

export const paymentSettingsSchema = z.object({
	lemonSqueezyApiKey: z.string().min(1, "API Key আবশ্যক"),
	lemonSqueezyStoreId: z.string().min(1, "Store ID আবশ্যক"),
	sslcommerzStoreId: z.string().min(1, "Store ID আবশ্যক"),
	sslcommerzStorePassword: z.string().min(1, "Store Password আবশ্যক"),
	paymentMode: z.enum(["sandbox", "live"]),
});
export type PaymentSettingsFormValues = z.infer<typeof paymentSettingsSchema>;

export const emailSettingsSchema = z.object({
	mailProvider: z.enum(["resend", "gmail"]),
	mailFromName: z.string().min(2, "প্রেরকের নাম আবশ্যক"),
	mailFromEmail: z.string().email("সঠিক ইমেইল দিন"),
	resendApiKey: z.string().optional().default(""),
});
export type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

export const profileSchema = z.object({
	name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
	phone: z.string().min(6, "সঠিক ফোন নম্বর দিন"),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, "বর্তমান পাসওয়ার্ড দিন"),
		newPassword: z.string().min(8, "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"),
		confirmPassword: z.string().min(8, "পাসওয়ার্ড নিশ্চিত করুন"),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "পাসওয়ার্ড মিলছে না",
		path: ["confirmPassword"],
	});
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
