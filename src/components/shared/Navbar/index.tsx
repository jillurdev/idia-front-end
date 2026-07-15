"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Bell,
	Bookmark,
	ChevronDown,
	LayoutDashboard,
	LogIn,
	Menu,
	ShoppingBag,
	X,
} from "lucide-react";
import { NavUser } from "./types";
import { NavIconBtn } from "./nav-icon-btn";
import { NavAvatar } from "./nav-avatar";
import { ProfileDropdown } from "./profile-dropdown";
import { NotifDropdown } from "./notif-dropdown";
import { MobileMenu } from "./mobile-menu";
import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/types/roles";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Browse", href: "/products" },
	{ label: "Categories", href: "/categories" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout } = useAuth();

	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const notifRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			)
				setDropdownOpen(false);
			if (notifRef.current && !notifRef.current.contains(e.target as Node))
				setNotifOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	useEffect(() => setMobileOpen(false), [pathname]);

	const handleProtected = (href: string) => {
		if (!user) {
			router.push(`/login?next=${encodeURIComponent(href)}`);
		} else {
			router.push(href);
		}
	};

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	const navUser: NavUser | null = user
		? {
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				role: user.role as NavUser["role"],
			}
		: null;

	const staffUser = navUser ? isAdmin(navUser.role) : false;
	const dashboardHref = navUser?.role === "OWNER" ? "/owner" : "/admin";

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					scrolled
						? "bg-brand-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] py-3"
						: "bg-brand-white py-4",
				)}>
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
					<Link href="/" className="flex-shrink-0 group">
						<span className="font-serif text-[22px] font-semibold text-brand-navy tracking-tight group-hover:text-brand-purple-dark transition-colors duration-200">
							Idia<span className="text-brand-purple">Designs</span>
						</span>
					</Link>

					<ul className="hidden lg:flex items-center gap-1">
						{NAV_LINKS.map(({ label, href }) => (
							<li key={href}>
								<Link
									href={href}
									className={cn(
										"relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-[4px]",
										isActive(href)
											? "text-brand-navy"
											: "text-brand-black/55 hover:text-brand-navy",
									)}>
									{label}
									{isActive(href) && (
										<span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-brand-purple rounded-full" />
									)}
								</Link>
							</li>
						))}
					</ul>

					<div className="hidden lg:flex items-center gap-2">
						{navUser ? (
							<>
								{staffUser ? (
									// Owner/Admin: a single, clear shortcut into their panel —
									// no buyer-facing Saved/Purchases/Notifications icons here.
									<Link
										href={dashboardHref}
										className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-brand-purple-dark hover:bg-brand-purple/5 rounded-[6px] transition-colors">
										<LayoutDashboard className="w-4 h-4" />
										Dashboard
									</Link>
								) : (
									<>
										<NavIconBtn
											icon={<Bookmark className="w-4 h-4" />}
											label="Saved items"
											onClick={() => handleProtected("/saved")}
										/>
										<NavIconBtn
											icon={<ShoppingBag className="w-4 h-4" />}
											label="Purchases"
											onClick={() => handleProtected("/purchases")}
										/>
										<div ref={notifRef} className="relative">
											<NavIconBtn
												icon={<Bell className="w-4 h-4" />}
												label="Notifications"
												onClick={() => setNotifOpen(v => !v)}
											/>
											{notifOpen && (
												<NotifDropdown onClose={() => setNotifOpen(false)} />
											)}
										</div>
									</>
								)}

								<div ref={dropdownRef} className="relative ml-1">
									<button
										onClick={() => setDropdownOpen(v => !v)}
										className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-surface-subtle hover:border-brand-purple/40 transition-colors duration-200"
										aria-label="User menu">
										<NavAvatar user={navUser} size="sm" />
										<ChevronDown
											className={cn(
												"w-3 h-3 text-brand-black/40 transition-transform duration-200",
												dropdownOpen && "rotate-180",
											)}
										/>
									</button>
									{dropdownOpen && (
										<ProfileDropdown
											user={navUser}
											onClose={() => setDropdownOpen(false)}
											onLogout={logout}
										/>
									)}
								</div>
							</>
						) : (
							<>
								<Link
									href="/login"
									className="text-[13px] font-medium text-brand-black/60 hover:text-brand-navy transition-colors px-3 py-2">
									Sign in
								</Link>
								<Link
									href="/register"
									className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-navy text-brand-white text-[13px] font-medium tracking-wide rounded-[6px] hover:bg-[#252550] transition-colors duration-200">
									<LogIn className="w-3.5 h-3.5" />
									Get Started
								</Link>
							</>
						)}
					</div>

					<button
						onClick={() => setMobileOpen(v => !v)}
						className="lg:hidden p-2 rounded-[6px] text-brand-black/60 hover:text-brand-navy hover:bg-surface-subtle/50 transition-colors"
						aria-label="Toggle menu">
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</nav>
			</header>

			<MobileMenu
				open={mobileOpen}
				user={navUser}
				pathname={pathname}
				onProtected={handleProtected}
				onLogout={logout}
				onClose={() => setMobileOpen(false)}
			/>

			<div className="h-[64px]" />
		</>
	);
}
