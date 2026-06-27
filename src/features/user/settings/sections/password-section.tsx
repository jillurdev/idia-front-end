"use client";

import { usersApi } from "@/lib/api/users.api";
import { useState } from "react";
import { toast } from "sonner";

export default function PasswordSection() {
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (form.newPassword !== form.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (form.newPassword.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		setIsLoading(true);

		try {
			await usersApi.changePassword({
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});
			toast.success("Password changed!");
			setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to change password",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{(["currentPassword", "newPassword", "confirmPassword"] as const).map(
				field => (
					<div key={field} className="space-y-1.5">
						<label className="text-sm font-medium text-[#1a1a2e] capitalize">
							{field.replace(/([A-Z])/g, " $1")}
						</label>
						<input
							type="password"
							value={form[field]}
							onChange={e => setForm({ ...form, [field]: e.target.value })}
							className="w-full px-4 py-3 border border-[#e4d8c4] rounded-xl bg-[#fffdf9] text-sm text-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#c8a96e] focus:border-[#c8a96e] transition"
						/>
					</div>
				),
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="px-5 py-2.5 rounded-xl bg-[#0d0d0d] text-[#f5f0e8] text-sm font-medium hover:bg-[#1a1a2e] disabled:opacity-50 transition shadow-sm">
				{isLoading ? "Changing..." : "Change Password"}
			</button>
		</form>
	);
}
