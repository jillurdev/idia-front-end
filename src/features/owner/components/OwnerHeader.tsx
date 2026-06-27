"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface User {
	name: string;
	email: string;
	role: string;
	avatar: string | null;
}

export default function OwnerHeader({ user }: { user: User }) {
	const router = useRouter();
	const { logout } = useAuth();

	const handleLogout = async () => {
		await logout();
		router.replace("/login");
	};

	return (
		<header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-border bg-brand-white sticky top-0 z-10">
			<button className="lg:hidden text-brand-navy">
				<Menu className="w-5 h-5" />
			</button>

			<div className="hidden lg:block" />

			<div className="flex items-center gap-4">
				<div className="text-right">
					<p className="text-[13px] font-medium text-brand-navy leading-tight">
						{user.name}
					</p>
					<p className="text-[11px] text-text-secondary/50 leading-tight">
						{user.role}
					</p>
				</div>

				<div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-brand-white text-[12px] font-semibold flex-shrink-0">
					{user.avatar ? (
						<img
							src={user.avatar}
							alt={user.name}
							className="w-full h-full rounded-full object-cover"
						/>
					) : (
						user.name.charAt(0).toUpperCase()
					)}
				</div>

				<button
					onClick={handleLogout}
					className="p-2 rounded-lg text-text-secondary/50 hover:text-red-500 hover:bg-red-50 transition-colors">
					<LogOut className="w-4 h-4" />
				</button>
			</div>
		</header>
	);
}
