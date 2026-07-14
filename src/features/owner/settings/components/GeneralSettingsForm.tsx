"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	generalSettingsSchema,
	type GeneralSettingsFormValues,
} from "../schema";
import { SETTING_KEYS } from "../types";
import { useUpsertSettingsBatch } from "../hooks/useUpsertSetting";
import { Button } from "@/components/ui/Button";

interface Props {
	values: Record<string, string>;
}

export default function GeneralSettingsForm({ values }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<GeneralSettingsFormValues>({
		resolver: zodResolver(generalSettingsSchema),
		defaultValues: {
			siteName: values[SETTING_KEYS.general.siteName] || "",
			siteLogo: values[SETTING_KEYS.general.siteLogo] || "",
			contactEmail: values[SETTING_KEYS.general.contactEmail] || "",
			contactPhone: values[SETTING_KEYS.general.contactPhone] || "",
		},
	});

	useEffect(() => {
		reset({
			siteName: values[SETTING_KEYS.general.siteName] || "",
			siteLogo: values[SETTING_KEYS.general.siteLogo] || "",
			contactEmail: values[SETTING_KEYS.general.contactEmail] || "",
			contactPhone: values[SETTING_KEYS.general.contactPhone] || "",
		});
	}, [values, reset]);

	const { mutate, isPending } = useUpsertSettingsBatch();

	const onSubmit = (data: GeneralSettingsFormValues) => {
		mutate([
			{
				key: SETTING_KEYS.general.siteName,
				value: data.siteName,
				group: "general",
			},
			{
				key: SETTING_KEYS.general.siteLogo,
				value: data.siteLogo,
				group: "general",
			},
			{
				key: SETTING_KEYS.general.contactEmail,
				value: data.contactEmail,
				group: "general",
			},
			{
				key: SETTING_KEYS.general.contactPhone,
				value: data.contactPhone,
				group: "general",
			},
		]);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div>
				<label className="block text-sm font-medium text-text-secondary mb-1.5">
					সাইটের নাম
				</label>
				<input
					{...register("siteName")}
					className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
					placeholder="IdiaDesigns"
				/>
				{errors.siteName && (
					<p className="mt-1 text-sm text-red-500">{errors.siteName.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-text-secondary mb-1.5">
					লোগো URL
				</label>
				<input
					{...register("siteLogo")}
					className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
					placeholder="https://..."
				/>
				{errors.siteLogo && (
					<p className="mt-1 text-sm text-red-500">{errors.siteLogo.message}</p>
				)}
			</div>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div>
					<label className="block text-sm font-medium text-text-secondary mb-1.5">
						যোগাযোগের ইমেইল
					</label>
					<input
						{...register("contactEmail")}
						className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						placeholder="support@idiadesigns.com"
					/>
					{errors.contactEmail && (
						<p className="mt-1 text-sm text-red-500">
							{errors.contactEmail.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-text-secondary mb-1.5">
						যোগাযোগের ফোন
					</label>
					<input
						{...register("contactPhone")}
						className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						placeholder="+8801XXXXXXXXX"
					/>
					{errors.contactPhone && (
						<p className="mt-1 text-sm text-red-500">
							{errors.contactPhone.message}
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-end pt-2">
				<Button type="submit" loading={isPending} disabled={!isDirty}>
					সংরক্ষণ করুন
				</Button>
			</div>
		</form>
	);
}
