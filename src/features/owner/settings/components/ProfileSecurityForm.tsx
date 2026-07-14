"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	profileSchema,
	type ProfileFormValues,
	changePasswordSchema,
	type ChangePasswordFormValues,
} from "../schema";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useChangePassword } from "../hooks/useChangePassword";
import {Button} from "@/components/ui/Button";
import type { OwnerProfile } from "../types";

interface Props {
	profile: OwnerProfile;
}

export default function ProfileSecurityForm({ profile }: Props) {
	const {
		register: registerProfile,
		handleSubmit: handleProfileSubmit,
		formState: { errors: profileErrors, isDirty: profileDirty },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: { name: profile.name, phone: profile.phone },
	});

	const {
		register: registerPassword,
		handleSubmit: handlePasswordSubmit,
		reset: resetPassword,
		formState: { errors: passwordErrors },
	} = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const { mutate: updateProfile, isPending: profilePending } =
		useUpdateProfile();
	const { mutate: changePassword, isPending: passwordPending } =
		useChangePassword();

	const onProfileSubmit = (data: ProfileFormValues) => updateProfile(data);

	const onPasswordSubmit = (data: ChangePasswordFormValues) => {
		changePassword(
			{ currentPassword: data.currentPassword, newPassword: data.newPassword },
			{ onSuccess: () => resetPassword() },
		);
	};

	return (
		<div className="space-y-8">
			<div>
				<h3 className="mb-4 text-base font-semibold text-text-primary">
					প্রোফাইল তথ্য
				</h3>
				<form
					onSubmit={handleProfileSubmit(onProfileSubmit)}
					className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							ইমেইল
						</label>
						<input
							value={profile.email}
							disabled
							className="w-full cursor-not-allowed rounded-lg border border-border bg-surface-muted px-3.5 py-2.5 text-text-muted"
						/>
					</div>

					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-text-secondary mb-1.5">
								নাম
							</label>
							<input
								{...registerProfile("name")}
								className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
							/>
							{profileErrors.name && (
								<p className="mt-1 text-sm text-red-500">
									{profileErrors.name.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-text-secondary mb-1.5">
								ফোন
							</label>
							<input
								{...registerProfile("phone")}
								className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
							/>
							{profileErrors.phone && (
								<p className="mt-1 text-sm text-red-500">
									{profileErrors.phone.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex justify-end">
						<Button
							type="submit"
							loading={profilePending}
							disabled={!profileDirty}>
							প্রোফাইল আপডেট করুন
						</Button>
					</div>
				</form>
			</div>

			<div className="border-t border-border-subtle pt-8">
				<h3 className="mb-4 text-base font-semibold text-text-primary">
					পাসওয়ার্ড পরিবর্তন
				</h3>
				<form
					onSubmit={handlePasswordSubmit(onPasswordSubmit)}
					className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-text-secondary mb-1.5">
							বর্তমান পাসওয়ার্ড
						</label>
						<input
							type="password"
							{...registerPassword("currentPassword")}
							className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
						/>
						{passwordErrors.currentPassword && (
							<p className="mt-1 text-sm text-red-500">
								{passwordErrors.currentPassword.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-text-secondary mb-1.5">
								নতুন পাসওয়ার্ড
							</label>
							<input
								type="password"
								{...registerPassword("newPassword")}
								className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
							/>
							{passwordErrors.newPassword && (
								<p className="mt-1 text-sm text-red-500">
									{passwordErrors.newPassword.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-text-secondary mb-1.5">
								নিশ্চিত করুন
							</label>
							<input
								type="password"
								{...registerPassword("confirmPassword")}
								className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-subtle"
							/>
							{passwordErrors.confirmPassword && (
								<p className="mt-1 text-sm text-red-500">
									{passwordErrors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex justify-end">
						<Button type="submit" loading={passwordPending}>
							পাসওয়ার্ড পরিবর্তন করুন
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
