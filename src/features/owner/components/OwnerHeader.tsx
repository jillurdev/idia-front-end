"use client";

import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface OwnerHeaderProps {
	user: {
		name: string;
		email: string;
		role: string;
		avatar: string | null;
	};
	onMenuClick: () => void; // ← sidebar toggle
}

export default function OwnerHeader({ user, onMenuClick }: OwnerHeaderProps) {
	const { logout } = useAuth();

	return (
		<header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-border bg-brand-white sticky top-0 z-10">
			{/* Mobile menu button */}
			<button
				onClick={onMenuClick}
				className="lg:hidden p-2 rounded-lg text-brand-navy hover:bg-surface-subtle transition-colors">
				<Menu className="w-5 h-5" />
			</button>

			<div className="hidden lg:block" />

			<div className="flex items-center gap-4">
				<div className="text-right hidden sm:block">
					<p className="text-[13px] font-medium text-brand-navy leading-tight">
						{user.name}
					</p>
					<p className="text-[11px] text-text-muted leading-tight capitalize">
						{user.role.toLowerCase()}
					</p>
				</div>

				<div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-brand-white text-[12px] font-semibold flex-shrink-0 overflow-hidden">
					{user.avatar ? (
						<img
							src={user.avatar}
							alt={user.name}
							className="w-full h-full object-cover"
						/>
					) : (
						user.name.charAt(0).toUpperCase()
					)}
				</div>

				<button
					onClick={logout}
					className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
					title="Logout">
					<LogOut className="w-4 h-4" />
				</button>
			</div>
		</header>
	);
}
