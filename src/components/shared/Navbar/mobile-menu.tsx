import Link from "next/link";
import {
	Bell,
	Bookmark,
	LayoutDashboard,
	LogOut,
	Settings,
	ShoppingBag,
	User,
	X,
} from "lucide-react";
import type { NavUser } from "./types";
import { NavAvatar } from "./nav-avatar";
import { isAdmin } from "@/types/roles";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Browse", href: "/products" },
	{ label: "Categories", href: "/categories" },
	{ label: "About", href: "/about" },
];

export function MobileMenu({
	open,
	user,
	pathname,
	onProtected,
	onLogout,
	onClose,
}: {
	open: boolean;
	user: NavUser | null;
	pathname: string;
	onProtected: (href: string) => void;
	onLogout: () => void;
	onClose: () => void;
}) {
	const staffUser = user ? isAdmin(user.role) : false;
	const dashboardHref = user?.role === "OWNER" ? "/owner" : "/admin";

	// Owner/Admin see only a single dashboard shortcut here —
	// everything else lives inside the dashboard itself.
	const accountLinks = staffUser
		? [
				{
					icon: <LayoutDashboard className="w-4 h-4" />,
					label: "Go to Dashboard",
					href: dashboardHref,
				},
			]
		: [
				{
					icon: <ShoppingBag className="w-4 h-4" />,
					label: "Purchases",
					href: "/purchases",
				},
				{
					icon: <Bookmark className="w-4 h-4" />,
					label: "Saved Items",
					href: "/saved",
				},
				{
					icon: <Bell className="w-4 h-4" />,
					label: "Notifications",
					href: "/notifications",
				},
				{
					icon: <User className="w-4 h-4" />,
					label: "Profile",
					href: "/profile",
				},
				{
					icon: <Settings className="w-4 h-4" />,
					label: "Settings",
					href: "/settings",
				},
			];

	return (
		<>
			{open && (
				<div
					className="fixed inset-0 z-40 bg-brand-navy/20 backdrop-blur-sm lg:hidden"
					onClick={onClose}
				/>
			)}
			<div
				className={cn(
					"fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-brand-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
					open ? "translate-x-0" : "translate-x-full",
				)}>
				<div className="flex items-center justify-between px-5 py-4 border-b border-surface-subtle">
					<span className="font-serif text-[18px] font-semibold text-brand-navy">
						Idia<span className="text-brand-purple">Designs</span>
					</span>
					<button
						onClick={onClose}
						className="p-1.5 rounded-full hover:bg-surface-subtle/60 text-brand-black/40 transition-colors">
						<X className="w-4 h-4" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto py-4 px-3">
					<p className="px-3 text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-medium mb-2">
						Navigation
					</p>
					{NAV_LINKS.map(({ label, href }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex items-center px-3 py-3 rounded-[6px] text-[14px] font-medium transition-colors mb-0.5",
								pathname === href || (href !== "/" && pathname.startsWith(href))
									? "bg-brand-navy text-brand-white"
									: "text-brand-black/70 hover:bg-surface-subtle/60 hover:text-brand-navy",
							)}>
							{label}
						</Link>
					))}

					{user && (
						<>
							<div className="my-4 border-t border-surface-subtle" />
							<p className="px-3 text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-medium mb-2">
								{staffUser ? "Dashboard" : "My Account"}
							</p>
							{accountLinks.map(({ icon, label, href }) => (
								<button
									key={href}
									onClick={() => {
										onProtected(href);
										onClose();
									}}
									className={cn(
										"w-full flex items-center gap-3 px-3 py-3 rounded-[6px] text-[14px] transition-colors mb-0.5 text-left",
										staffUser
											? "font-medium text-brand-purple-dark hover:bg-brand-purple/5"
											: "text-brand-black/70 hover:bg-surface-subtle/60 hover:text-brand-navy",
									)}>
									<span className={staffUser ? "" : "text-brand-purple-dark"}>
										{icon}
									</span>
									{label}
								</button>
							))}
						</>
					)}
				</div>

				<div className="px-5 py-4 border-t border-surface-subtle">
					{user ? (
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<NavAvatar user={user} size="md" />
								<div className="min-w-0">
									<p className="text-[13px] font-semibold text-brand-navy truncate">
										{user.name}
									</p>
									<p className="text-[11px] text-brand-black/40 truncate">
										{user.email}
									</p>
								</div>
							</div>
							<button
								onClick={() => {
									onLogout();
									onClose();
								}}
								className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-500 text-[13px] font-medium rounded-[6px] hover:bg-red-50 transition-colors">
								<LogOut className="w-4 h-4" />
								Sign out
							</button>
						</div>
					) : (
						<div className="space-y-2.5">
							<Link
								href="/login"
								className="block w-full text-center py-2.5 border border-surface-subtle text-brand-navy text-[13px] font-medium rounded-[6px] hover:bg-surface-subtle/40 transition-colors">
								Sign In
							</Link>
							<Link
								href="/register"
								className="block w-full text-center py-2.5 bg-brand-navy text-brand-white text-[13px] font-medium rounded-[6px] hover:bg-[#252550] transition-colors">
								Get Started
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
