"use client";

import { useState } from "react";
import { useChangePassword } from "../hooks/useChangePassword";

export default function PasswordSection() {
	const { changePassword, isChanging } = useChangePassword();
	const [form, setForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const mismatch =
		form.confirmPassword.length > 0 && form.newPassword !== form.confirmPassword;
	const tooShort = form.newPassword.length > 0 && form.newPassword.length < 6;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.currentPassword || tooShort || mismatch || !form.newPassword) {
			return;
		}

		try {
			await changePassword({
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});
			setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
		} catch {
			// error toast already handled inside useChangePassword
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">
					Current password
				</label>
				<input
					type="password"
					value={form.currentPassword}
					onChange={e => setForm({ ...form, currentPassword: e.target.value })}
					autoComplete="current-password"
					className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
				/>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">
					New password
				</label>
				<input
					type="password"
					value={form.newPassword}
					onChange={e => setForm({ ...form, newPassword: e.target.value })}
					autoComplete="new-password"
					className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
				/>
				{tooShort && (
					<p className="text-xs text-red-500">
						Password must be at least 6 characters
					</p>
				)}
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">
					Confirm new password
				</label>
				<input
					type="password"
					value={form.confirmPassword}
					onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
					autoComplete="new-password"
					className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
				/>
				{mismatch && (
					<p className="text-xs text-red-500">Passwords do not match</p>
				)}
			</div>

			<button
				type="submit"
				disabled={
					isChanging || !form.currentPassword || tooShort || mismatch || !form.newPassword
				}
				className="px-5 py-2.5 rounded-xl bg-brand-navy text-brand-white text-sm font-medium hover:bg-[#252550] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm">
				{isChanging ? "Changing..." : "Change Password"}
			</button>
		</form>
	);
}
