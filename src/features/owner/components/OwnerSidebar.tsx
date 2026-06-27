"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

export default function OwnerSidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-brand-navy min-h-screen sticky top-0">
			<div className="px-6 py-6 border-b border-brand-white/10">
				<Link href="/owner" className="flex items-center gap-2">
					<span className="font-serif text-lg font-semibold text-brand-white">
						Idia<span className="text-brand-purple-light">Designs</span>
					</span>
				</Link>
				<p className="text-[10px] uppercase tracking-[0.2em] text-brand-cyan/60 font-medium mt-1">
					Owner Panel
				</p>
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
		</aside>
	);
}
