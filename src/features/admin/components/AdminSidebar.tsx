"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, Users, ShoppingCart, Package } from "lucide-react";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ label: "Users", href: "/admin/users", icon: Users },
	{ label: "Orders", href: "/admin/orders", icon: ShoppingCart },
	{ label: "Items", href: "/admin/items", icon: Package },
];

interface AdminSidebarProps {
	mobileOpen: boolean;
	onClose: () => void;
}

export default function AdminSidebar({
	mobileOpen,
	onClose,
}: AdminSidebarProps) {
	const pathname = usePathname();

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	const NavContent = () => (
		<>
			<div className="px-6 py-6 border-b border-brand-white/10 flex items-center justify-between">
				<div>
					<Link
						href="/admin/dashboard"
						className="font-serif text-lg font-semibold text-brand-white">
						Idia<span className="text-brand-purple-light">Designs</span>
					</Link>
					<p className="text-[10px] uppercase tracking-[0.2em] text-brand-cyan/60 font-medium mt-1">
						Admin Panel
					</p>
				</div>
				{/* Mobile close */}
				<button
					onClick={onClose}
					className="lg:hidden p-1 text-brand-white/40 hover:text-brand-white transition-colors">
					<X className="w-4 h-4" />
				</button>
			</div>

			<nav className="flex-1 px-3 py-4 space-y-0.5">
				{NAV_ITEMS.map(({ label, href, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						onClick={onClose}
						className={`flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[13px] font-medium transition-colors ${
							isActive(href)
								? "bg-brand-white/10 text-brand-white"
								: "text-brand-white/60 hover:bg-brand-white/5 hover:text-brand-white"
						}`}>
						<Icon className="w-4 h-4" />
						{label}
					</Link>
				))}
			</nav>
		</>
	);

	return (
		<>
			{/* Mobile overlay */}
			{mobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Desktop sidebar */}
			<aside className="hidden lg:flex lg:flex-col w-64 bg-brand-navy shrink-0">
				<NavContent />
			</aside>

			{/* Mobile sidebar */}
			<aside
				className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-brand-navy flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<NavContent />
			</aside>
		</>
	);
}
