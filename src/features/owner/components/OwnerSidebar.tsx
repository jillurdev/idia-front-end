"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	X,
	LayoutDashboard,
	FolderTree,
	Tags,
	Package,
	ShoppingCart,
	Star,
	Users,
	Mail,
	Settings,
	ScrollText,
} from "lucide-react";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/owner", icon: LayoutDashboard },
	{ label: "Categories", href: "/owner/categories", icon: FolderTree },
	{ label: "Tags", href: "/owner/tags", icon: Tags },
	{ label: "Products", href: "/owner/products", icon: Package },
	{ label: "Purchases", href: "/owner/purchases", icon: ShoppingCart },
	{ label: "Reviews", href: "/owner/reviews", icon: Star },
	{ label: "Users", href: "/owner/users", icon: Users },
	{ label: "Emails", href: "/owner/emails", icon: Mail },
	{ label: "Settings", href: "/owner/settings", icon: Settings },
	{ label: "Logs", href: "/owner/logs", icon: ScrollText },
];

interface OwnerSidebarProps {
	mobileOpen: boolean;
	onClose: () => void;
}

export default function OwnerSidebar({
	mobileOpen,
	onClose,
}: OwnerSidebarProps) {
	const pathname = usePathname();

	const NavContent = () => (
		<>
			<div className="px-6 py-6 border-b border-brand-white/10 flex items-center justify-between">
				<div>
					<Link
						href="/owner"
						className="font-serif text-lg font-semibold text-brand-white">
						Idia<span className="text-brand-purple-light">Designs</span>
					</Link>
					<p className="text-[10px] uppercase tracking-[0.2em] text-brand-cyan/60 font-medium mt-1">
						Owner Panel
					</p>
				</div>
				{/* Mobile close */}
				<button
					onClick={onClose}
					className="lg:hidden p-1 text-brand-white/40 hover:text-brand-white transition-colors">
					<X className="w-4 h-4" />
				</button>
			</div>

			<nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
				{NAV_ITEMS.map(({ label, href, icon: Icon }) => {
					const isActive =
						pathname === href ||
						(href !== "/owner" && pathname.startsWith(href));
					return (
						<Link
							key={href}
							href={href}
							onClick={onClose} // mobile এ click করলে sidebar বন্ধ
							className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
								isActive
									? "bg-brand-purple text-brand-white"
									: "text-brand-white/50 hover:bg-brand-white/5 hover:text-brand-white"
							}`}>
							<Icon className="w-4 h-4 flex-shrink-0" />
							{label}
						</Link>
					);
				})}
			</nav>

			<div className="px-6 py-4 border-t border-brand-white/10">
				<Link
					href="/"
					className="text-[12px] text-brand-white/40 hover:text-brand-cyan transition-colors">
					← Back to website
				</Link>
			</div>
		</>
	);

	return (
		<>
			{/* Desktop sidebar */}
			<aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-brand-navy min-h-screen sticky top-0">
				<NavContent />
			</aside>

			{/* Mobile overlay */}
			{mobileOpen && (
				<div
					className="lg:hidden fixed inset-0 z-40 bg-brand-black/60 backdrop-blur-sm"
					onClick={onClose}
				/>
			)}

			{/* Mobile drawer */}
			<aside
				className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy flex flex-col transform transition-transform duration-300 ${
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<NavContent />
			</aside>
		</>
	);
}
