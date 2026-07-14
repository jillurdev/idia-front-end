"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	paymentSettingsSchema,
	type PaymentSettingsFormValues,
} from "../schema";
import { SETTING_KEYS } from "../types";
import { useUpsertSettingsBatch } from "../hooks/useUpsertSetting";
import { Button } from "@/components/ui/Button";

interface Props {
	values: Record<string, string>;
}

export default function PaymentSettingsForm({ values }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<PaymentSettingsFormValues>({
		resolver: zodResolver(paymentSettingsSchema),
		defaultValues: {
			lemonSqueezyApiKey: values[SETTING_KEYS.payment.lemonSqueezyApiKey] || "",
			lemonSqueezyStoreId:
				values[SETTING_KEYS.payment.lemonSqueezyStoreId] || "",
			sslcommerzStoreId: values[SETTING_KEYS.payment.sslcommerzStoreId] || "",
			sslcommerzStorePassword:
				values[SETTING_KEYS.payment.sslcommerzStorePassword] || "",
			paymentMode:
				(values[SETTING_KEYS.payment.paymentMode] as "sandbox" | "live") ||
				"sandbox",
		},
	});

	useEffect(() => {
		reset({
			lemonSqueezyApiKey: values[SETTING_KEYS.payment.lemonSqueezyApiKey] || "",
			lemonSqueezyStoreId:
				values[SETTING_KEYS.payment.lemonSqueezyStoreId] || "",
			sslcommerzStoreId: values[SETTING_KEYS.payment.sslcommerzStoreId] || "",
			sslcommerzStorePassword:
				values[SETTING_KEYS.payment.sslcommerzStorePassword] || "",
			paymentMode:
				(values[SETTING_KEYS.payment.paymentMode] as "sandbox" | "live") ||
				"sandbox",
		});
	}, [values, reset]);

	const { mutate, isPending } = useUpsertSettingsBatch();

	const onSubmit = (data: PaymentSettingsFormValues) => {
		mutate([
			{
				key: SETTING_KEYS.payment.lemonSqueezyApiKey,
				value: data.lemonSqueezyApiKey,
				group: "payment",
			},
			{
				key: SETTING_KEYS.payment.lemonSqueezyStoreId,
				value: data.lemonSqueezyStoreId,
				group: "payment",
			},
			{
				key: SETTING_KEYS.payment.sslcommerzStoreId,
				value: data.sslcommerzStoreId,
				group: "payment",
			},
			{
				key: SETTING_KEYS.payment.sslcommerzStorePassword,
				value: data.sslcommerzStorePassword,
				group: "payment",
			},
			{
				key: SETTING_KEYS.payment.paymentMode,
				value: data.paymentMode,
				group: "payment",
			},
		]);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div>
				<label className="block text-sm font-medium text-text-secondary mb-1.5">
					পেমেন্ট মোড
				</label>
				<select
					{...register("paymentMode")}
					className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle">
					<option value="sandbox">Sandbox (টেস্টিং)</option>
					<option value="live">Live (প্রোডাকশন)</option>
				</select>
			</div>

			<div className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
				<h4 className="mb-4 text-sm font-semibold text-text-primary">
					LemonSqueezy (USD)
				</h4>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							API Key
						</label>
						<input
							type="password"
							{...register("lemonSqueezyApiKey")}
							className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						/>
						{errors.lemonSqueezyApiKey && (
							<p className="mt-1 text-sm text-red-500">
								{errors.lemonSqueezyApiKey.message}
							</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							Store ID
						</label>
						<input
							{...register("lemonSqueezyStoreId")}
							className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						/>
						{errors.lemonSqueezyStoreId && (
							<p className="mt-1 text-sm text-red-500">
								{errors.lemonSqueezyStoreId.message}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
				<h4 className="mb-4 text-sm font-semibold text-text-primary">
					SSLCommerz (BDT)
				</h4>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							Store ID
						</label>
						<input
							{...register("sslcommerzStoreId")}
							className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						/>
						{errors.sslcommerzStoreId && (
							<p className="mt-1 text-sm text-red-500">
								{errors.sslcommerzStoreId.message}
							</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							Store Password
						</label>
						<input
							type="password"
							{...register("sslcommerzStorePassword")}
							className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						/>
						{errors.sslcommerzStorePassword && (
							<p className="mt-1 text-sm text-red-500">
								{errors.sslcommerzStorePassword.message}
							</p>
						)}
					</div>
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
