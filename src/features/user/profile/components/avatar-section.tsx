"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserResponse } from "@/types/user";

export default function AvatarSection({ user }: { user: UserResponse }) {
	const { refetch } = useAuth();
	const [isUploading, setIsUploading] = useState(false);

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			// TODO: avatar upload API
			toast.success("Avatar updated!");
			await refetch();
		} catch {
			toast.error("Failed to update avatar");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row md:items-start gap-5 pt-16">
			<div className="relative">
				<div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#f5f0e8] border-4 border-white shadow-lg overflow-hidden ring-2 ring-[#c8a96e]/30">
					{user.avatar ? (
						<img
							src={user.avatar}
							alt={user.name}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#7c6a4a]">
							{user.name.charAt(0).toUpperCase()}
						</div>
					)}
				</div>

				<label className="absolute bottom-1 right-1 w-8 h-8 bg-[#c8a96e] hover:bg-[#b69559] rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleAvatarChange}
						disabled={isUploading}
					/>
					<span className="text-[#0d0d0d] text-xs font-bold">
						{isUploading ? "…" : "✎"}
					</span>
				</label>
			</div>

			<div className="space-y-1">
				<h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
					{user.name}
				</h2>
				<p className="text-sm font-medium text-[#7c6a4a] tracking-wide uppercase">
					{user.role}
				</p>
				<p className="text-sm text-[#6f675b]">
					Member since {new Date(user.createdAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
