"use client";

import { useState } from "react";
import { UserResponse } from "@/types/user";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function PersonalInfoSection({ user }: { user: UserResponse }) {
	const { updateProfile, isUpdating } = useUpdateProfile();
	const [form, setForm] = useState({
		name: user.name,
		phone: user.phone ?? "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateProfile(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">Full Name</label>
				<input
					type="text"
					value={form.name}
					onChange={e => setForm({ ...form, name: e.target.value })}
					className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
				/>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">Email</label>
				<input
					type="email"
					value={user.email}
					disabled
					className="w-full px-4 py-3 border border-border-subtle rounded-xl bg-surface-subtle text-sm text-text-muted cursor-not-allowed"
				/>
				<p className="text-xs text-text-muted">Email cannot be changed</p>
			</div>

			<div className="space-y-1.5">
				<label className="text-sm font-medium text-brand-navy">Phone</label>
				<input
					type="text"
					value={form.phone}
					onChange={e => setForm({ ...form, phone: e.target.value })}
					className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
				/>
			</div>

			<button
				type="submit"
				disabled={isUpdating}
				className="px-5 py-2.5 rounded-xl bg-brand-navy text-brand-white text-sm font-medium hover:bg-[#252550] disabled:opacity-50 transition shadow-sm">
				{isUpdating ? "Saving..." : "Save Changes"}
			</button>
		</form>
	);
}
