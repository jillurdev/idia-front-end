"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSettingsSchema, type EmailSettingsFormValues } from "../schema";
import { SETTING_KEYS } from "../types";
import { useUpsertSettingsBatch } from "../hooks/useUpsertSetting";
import { Button } from "@/components/ui/Button";

interface Props {
	values: Record<string, string>;
}

export default function EmailSettingsForm({ values }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useForm<EmailSettingsFormValues>({
		resolver: zodResolver(emailSettingsSchema),
		defaultValues: {
			mailProvider:
				(values[SETTING_KEYS.email.mailProvider] as "resend" | "gmail") ||
				"resend",
			mailFromName: values[SETTING_KEYS.email.mailFromName] || "",
			mailFromEmail: values[SETTING_KEYS.email.mailFromEmail] || "",
			resendApiKey: values[SETTING_KEYS.email.resendApiKey] || "",
		},
	});

	useEffect(() => {
		reset({
			mailProvider:
				(values[SETTING_KEYS.email.mailProvider] as "resend" | "gmail") ||
				"resend",
			mailFromName: values[SETTING_KEYS.email.mailFromName] || "",
			mailFromEmail: values[SETTING_KEYS.email.mailFromEmail] || "",
			resendApiKey: values[SETTING_KEYS.email.resendApiKey] || "",
		});
	}, [values, reset]);

	const { mutate, isPending } = useUpsertSettingsBatch();
	const provider = watch("mailProvider");

	const onSubmit = (data: EmailSettingsFormValues) => {
		mutate([
			{
				key: SETTING_KEYS.email.mailProvider,
				value: data.mailProvider,
				group: "email",
			},
			{
				key: SETTING_KEYS.email.mailFromName,
				value: data.mailFromName,
				group: "email",
			},
			{
				key: SETTING_KEYS.email.mailFromEmail,
				value: data.mailFromEmail,
				group: "email",
			},
			{
				key: SETTING_KEYS.email.resendApiKey,
				value: data.resendApiKey || "",
				group: "email",
			},
		]);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div>
				<label className="block text-sm font-medium text-text-secondary mb-1.5">
					মেইল প্রোভাইডার
				</label>
				<select
					{...register("mailProvider")}
					className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle">
					<option value="resend">Resend (Production)</option>
					<option value="gmail">Gmail / Nodemailer (Dev)</option>
				</select>
				<p className="mt-1.5 text-xs text-text-muted">
					Gmail সিলেক্ট করলে .env এর MAIL_USER ও MAIL_PASSWORD ব্যবহার হবে।
				</p>
			</div>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div>
					<label className="block text-sm font-medium text-text-secondary mb-1.5">
						প্রেরকের নাম
					</label>
					<input
						{...register("mailFromName")}
						className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						placeholder="IdiaDesigns"
					/>
					{errors.mailFromName && (
						<p className="mt-1 text-sm text-red-500">
							{errors.mailFromName.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-text-secondary mb-1.5">
						প্রেরকের ইমেইল
					</label>
					<input
						{...register("mailFromEmail")}
						className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						placeholder="no-reply@idiadesigns.com"
					/>
					{errors.mailFromEmail && (
						<p className="mt-1 text-sm text-red-500">
							{errors.mailFromEmail.message}
						</p>
					)}
				</div>
			</div>

			{provider === "resend" && (
				<div>
					<label className="block text-sm font-medium text-text-secondary mb-1.5">
						Resend API Key
					</label>
					<input
						type="password"
						{...register("resendApiKey")}
						className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
					/>
				</div>
			)}

			<div className="flex justify-end pt-2">
				<Button type="submit" loading={isPending} disabled={!isDirty}>
					সংরক্ষণ করুন
				</Button>
			</div>
		</form>
	);
}
