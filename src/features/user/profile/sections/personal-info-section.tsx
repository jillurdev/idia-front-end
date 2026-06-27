"use client";

import { useAuth } from "@/context/AuthContext";
import { usersApi } from "@/lib/api/users.api";
import { UserResponse } from "@/types/user";
import { useState } from "react";
import { toast } from "sonner";

export default function PersonalInfoSection({ user }: { user: UserResponse}) {
	const { refetch } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		name: user.name,
		phone: user.phone ?? "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await usersApi.updateProfile(form);
			await refetch();
			toast.success("Profile updated!");
		} catch (err: unknown) {
			toast.error(err instanceof Error ? err.message : "Failed to update");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-1.5">
				<label className="text-sm font-medium text-[#1a1a2e]">Full Name</label>
				<input
					type="text"
					value={form.name}
					onChange={e => setForm({ ...form, name: e.target.value })}
					className="w-full px-4 py-3 border border-[#e4d8c4] rounded-xl bg-[#fffdf9] text-sm text-[#0d0d0d] placeholder:text-[#9b927f] focus:outline-none focus:ring-2 focus:ring-[#c8a96e] focus:border-[#c8a96e] transition"
				/>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-[#1a1a2e]">Email</label>
				<input
					type="email"
					value={user.email}
					disabled
					className="w-full px-4 py-3 border border-[#eadfce] rounded-xl bg-[#f5f0e8] text-sm text-[#7b7263] cursor-not-allowed"
				/>
				<p className="text-xs text-[#8a816f]">Email cannot be changed</p>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-[#1a1a2e]">Phone</label>
				<input
					type="text"
					value={form.phone}
					onChange={e => setForm({ ...form, phone: e.target.value })}
					className="w-full px-4 py-3 border border-[#e4d8c4] rounded-xl bg-[#fffdf9] text-sm text-[#0d0d0d] placeholder:text-[#9b927f] focus:outline-none focus:ring-2 focus:ring-[#c8a96e] focus:border-[#c8a96e] transition"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="px-5 py-2.5 rounded-xl bg-[#0d0d0d] text-[#f5f0e8] text-sm font-medium hover:bg-[#1a1a2e] disabled:opacity-50 transition shadow-sm">
				{isLoading ? "Saving..." : "Save Changes"}
			</button>
		</form>
	);
}
