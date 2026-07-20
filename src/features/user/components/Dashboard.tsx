"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMyPurchases } from "@/features/user/purchases/hooks/useMyPurchases";
import { useMySaved } from "@/features/user/saved/hooks/useMySaved";
import {
	ShoppingBag,
	Heart,
	Bell,
	User,
	ArrowRight,
	Calendar,
} from "lucide-react";
import { useNotifications } from "../notifications/hooks/useNotifications";

export default function CustomerDashboard() {
	const { user, isLoading: authLoading } = useAuth();
	const { data: purchases = [], isLoading: purchasesLoading } =
		useMyPurchases();
	const { data: saved = [], isLoading: savedLoading } = useMySaved();
	const {
		notifications,
		unreadCount,
		isLoading: notifLoading,
	} = useNotifications();

	if (authLoading) return <DashboardSkeleton />;
	if (!user) return null;

	const isLoading = purchasesLoading || savedLoading || notifLoading;
	const recentPurchases = purchases.slice(0, 4);
	const recentNotifications = notifications.slice(0, 4);

	return (
		<div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
			{/* Welcome Hero */}
			<div className="rounded-3xl bg-gradient-brand-soft p-8 border border-border">
				<h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-navy">
					Hi, {user.name.split(" ")[0]} 👋
				</h1>
				<p className="mt-2 text-[15px] text-text-secondary">
					Welcome back to your dashboard
				</p>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					icon={<ShoppingBag className="w-5 h-5" />}
					label="Purchases"
					value={purchases.length}
					href="/purchases"
					loading={isLoading}
				/>
				<StatCard
					icon={<Heart className="w-5 h-5" />}
					label="Saved Items"
					value={saved.length}
					href="/saved"
					loading={isLoading}
				/>
				<StatCard
					icon={<Bell className="w-5 h-5" />}
					label="Unread Alerts"
					value={unreadCount}
					href="/notifications"
					loading={isLoading}
				/>
				<StatCard
					icon={<User className="w-5 h-5" />}
					label="Account"
					value={user.status === "ACTIVE" ? "Active" : user.status}
					href="/profile"
					loading={false}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Purchases */}
				<div className="rounded-2xl border border-border bg-surface overflow-hidden">
					<div className="flex items-center justify-between px-5 py-4 border-b border-border">
						<h2 className="text-[15px] font-semibold text-brand-navy">
							Recent Purchases
						</h2>
						<Link
							href="/purchases"
							className="flex items-center gap-1 text-[12px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
							View all <ArrowRight className="w-3 h-3" />
						</Link>
					</div>

					{purchasesLoading ? (
						<ListSkeleton />
					) : recentPurchases.length === 0 ? (
						<EmptyRow
							icon={<ShoppingBag className="w-5 h-5" />}
							text="No purchases yet"
							href="/products"
							cta="Browse products"
						/>
					) : (
						<div className="divide-y divide-border">
							{recentPurchases.map(p => (
								<Link
									key={p.id}
									href={`/products/${p.product.slug}`}
									className="flex items-center gap-3 px-5 py-3 hover:bg-surface-subtle/40 transition-colors">
									<img
										src={p.product.thumbnailUrl}
										alt={p.product.title}
										className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-surface-subtle"
									/>
									<div className="flex-1 min-w-0">
										<p className="text-[13px] font-medium text-brand-navy truncate">
											{p.product.title}
										</p>
										<p className="text-[11px] text-text-muted flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											{new Date(p.purchasedAt).toLocaleDateString()}
										</p>
									</div>
									<span className="text-[13px] font-semibold text-brand-navy">
										{p.currency === "USD" ? "$" : "৳"}
										{p.pricePaid.toFixed(2)}
									</span>
								</Link>
							))}
						</div>
					)}
				</div>

				{/* Recent Notifications */}
				<div className="rounded-2xl border border-border bg-surface overflow-hidden">
					<div className="flex items-center justify-between px-5 py-4 border-b border-border">
						<h2 className="text-[15px] font-semibold text-brand-navy">
							Recent Notifications
						</h2>
						<Link
							href="/notifications"
							className="flex items-center gap-1 text-[12px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
							View all <ArrowRight className="w-3 h-3" />
						</Link>
					</div>

					{notifLoading ? (
						<ListSkeleton />
					) : recentNotifications.length === 0 ? (
						<EmptyRow
							icon={<Bell className="w-5 h-5" />}
							text="No notifications yet"
						/>
					) : (
						<div className="divide-y divide-border">
							{recentNotifications.map(n => (
								<div key={n.id} className="flex items-start gap-3 px-5 py-3">
									{!n.isRead && (
										<span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-brand-purple flex-shrink-0" />
									)}
									<div className={n.isRead ? "pl-3.5" : ""}>
										<p className="text-[13px] font-medium text-brand-navy">
											{n.title}
										</p>
										<p className="text-[12px] text-text-secondary line-clamp-1">
											{n.message}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon,
	label,
	value,
	href,
	loading,
}: {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	href: string;
	loading: boolean;
}) {
	return (
		<Link
			href={href}
			className="rounded-2xl border border-border bg-surface p-5 flex flex-col gap-3 hover:border-brand-purple/40 transition-colors">
			<span className="w-9 h-9 rounded-full bg-brand-purple/10 text-brand-purple-dark flex items-center justify-center">
				{icon}
			</span>
			<div>
				<p className="text-[12px] text-text-muted">{label}</p>
				{loading ? (
					<div className="h-6 w-10 bg-surface-subtle rounded mt-1 animate-pulse" />
				) : (
					<p className="text-xl font-bold text-brand-navy mt-0.5">{value}</p>
				)}
			</div>
		</Link>
	);
}

function EmptyRow({
	icon,
	text,
	href,
	cta,
}: {
	icon: React.ReactNode;
	text: string;
	href?: string;
	cta?: string;
}) {
	return (
		<div className="px-5 py-8 flex flex-col items-center gap-2 text-center">
			<span className="text-brand-purple/40">{icon}</span>
			<p className="text-[13px] text-text-muted">{text}</p>
			{href && cta && (
				<Link
					href={href}
					className="text-[12px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
					{cta}
				</Link>
			)}
		</div>
	);
}

function ListSkeleton() {
	return (
		<div className="divide-y divide-border animate-pulse">
			{[1, 2, 3].map(i => (
				<div key={i} className="flex items-center gap-3 px-5 py-3">
					<div className="w-10 h-10 rounded-lg bg-surface-subtle flex-shrink-0" />
					<div className="flex-1 space-y-1.5">
						<div className="h-3.5 w-2/3 bg-surface-subtle rounded" />
						<div className="h-3 w-1/3 bg-surface-muted rounded" />
					</div>
				</div>
			))}
		</div>
	);
}

function DashboardSkeleton() {
	return (
		<div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-pulse">
			<div className="h-28 bg-surface-subtle rounded-3xl" />
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{[1, 2, 3, 4].map(i => (
					<div key={i} className="h-24 bg-surface-subtle rounded-2xl" />
				))}
			</div>
		</div>
	);
}
