import { useRouter } from "next/navigation";
import {
	Bookmark,
	ClipboardList,
	LayoutDashboard,
	LifeBuoy,
	LogOut,
	Settings,
	ShoppingBag,
	User,
	Crown,
} from "lucide-react";
import { isAdmin, ROLE_CONFIG } from "@/types/roles";
import type { NavUser } from "./types";

export function ProfileDropdown({
	user,
	onClose,
	onLogout,
}: {
	user: NavUser;
	onClose: () => void;
	onLogout: () => void;
}) {
	const router = useRouter();
	const roleConf = ROLE_CONFIG[user.role];
	const staffUser = isAdmin(user.role); // true for ADMIN and OWNER

	const go = (href: string) => {
		onClose();
		router.push(href);
	};

	// Regular buyers get the full account menu. Dashboard is first since
	// /dashboard is the USER role's home page (see proxy.ts ROLE_HOME).
	const buyerLinks = [
		{
			icon: <LayoutDashboard className="w-3.5 h-3.5" />,
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			icon: <User className="w-3.5 h-3.5" />,
			label: "My Profile",
			href: "/profile",
		},
		{
			icon: <ShoppingBag className="w-3.5 h-3.5" />,
			label: "Purchases",
			href: "/purchases",
		},
		{
			icon: <Bookmark className="w-3.5 h-3.5" />,
			label: "Saved items",
			href: "/saved",
		},
		{
			icon: <ClipboardList className="w-3.5 h-3.5" />,
			label: "My reviews",
			href: "/profile?tab=reviews",
		},
		{
			icon: <LifeBuoy className="w-3.5 h-3.5" />,
			label: "Support",
			href: "/support",
		},
		{
			icon: <Settings className="w-3.5 h-3.5" />,
			label: "Settings",
			href: "/settings",
		},
	];

	const dashboardHref = user.role === "OWNER" ? "/owner" : "/admin";

	return (
		<div className="absolute right-0 top-full mt-2 w-60 bg-brand-white border border-surface-subtle rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			{/* User info header */}
			<div className="px-4 py-3.5 border-b border-surface-subtle">
				<div className="flex items-center gap-2.5">
					<div
						className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
						style={{ backgroundColor: roleConf.bg, color: roleConf.text }}>
						{user.name.charAt(0).toUpperCase()}
					</div>
					<div className="min-w-0">
						<p className="text-[13px] font-semibold text-brand-navy truncate">
							{user.name}
						</p>
						<p className="text-[11px] text-brand-black/40 truncate">
							{user.email}
						</p>
					</div>
				</div>

				{user.role !== "USER" && (
					<div className="mt-2 flex items-center gap-1.5">
						<span
							className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
							style={{ backgroundColor: roleConf.bg, color: roleConf.text }}>
							{user.role === "OWNER" && (
								<Crown
									className="w-2.5 h-2.5"
									style={{ color: roleConf.dot }}
								/>
							)}
							{roleConf.label}
						</span>
					</div>
				)}
			</div>

			{staffUser ? (
				// Owner/Admin: minimal menu — everything else happens inside the dashboard itself.
				<div className="py-1.5">
					<button
						onClick={() => go(dashboardHref)}
						className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-brand-purple-dark hover:bg-brand-purple/5 transition-colors text-left">
						<LayoutDashboard className="w-3.5 h-3.5" />
						Go to Dashboard
					</button>
				</div>
			) : (
				<div className="py-1.5">
					{buyerLinks.map(({ icon, label, href }) => (
						<button
							key={href}
							onClick={() => go(href)}
							className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-brand-black/70 hover:bg-surface-subtle/50 hover:text-brand-navy transition-colors text-left">
							<span className="text-brand-purple-dark">{icon}</span>
							{label}
						</button>
					))}
				</div>
			)}

			<div className="border-t border-surface-subtle py-1.5">
				<button
					onClick={() => {
						onClose();
						onLogout();
					}}
					className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors text-left">
					<LogOut className="w-3.5 h-3.5" />
					Sign out
				</button>
			</div>
		</div>
	);
}
