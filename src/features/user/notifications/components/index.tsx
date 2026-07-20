"use client";

import {
	Bell,
	BellOff,
	Package,
	Tag,
	Star,
	Megaphone,
	TrendingDown,
} from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkNotificationRead } from "../hooks/useMarkNotificationRead";
import type { NotifType } from "../types";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<NotifType, React.ReactNode> = {
	NEW_PRODUCT: <Package className="w-4 h-4" />,
	CATEGORY_UPDATE: <Tag className="w-4 h-4" />,
	PURCHASE_SUCCESS: <Package className="w-4 h-4" />,
	REVIEW_APPROVED: <Star className="w-4 h-4" />,
	SYSTEM: <Megaphone className="w-4 h-4" />,
	PRICE_DROP: <TrendingDown className="w-4 h-4" />,
};

function timeAgo(dateString: string) {
	const diffMs = Date.now() - new Date(dateString).getTime();
	const mins = Math.floor(diffMs / 60000);
	if (mins < 1) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs}h ago`;
	const days = Math.floor(hrs / 24);
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days}d ago`;
	return new Date(dateString).toLocaleDateString();
}

export default function NotificationsClient() {
	const { notifications, unreadCount, isLoading } = useNotifications();
	const { markRead, markAllRead } = useMarkNotificationRead();

	if (isLoading) return <NotifSkeleton />;

	return (
		<div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
			<div className="flex items-center gap-3">
				<Bell className="w-6 h-6 text-brand-purple-dark" />
				<h1 className="font-serif text-2xl font-semibold text-brand-navy tracking-tight">
					Notifications
				</h1>
				{unreadCount > 0 && (
					<button
						onClick={() => markAllRead()}
						className="ml-auto text-[12px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
						Mark all as read
					</button>
				)}
			</div>

			{notifications.length === 0 ? (
				<div className="rounded-2xl border border-border bg-surface p-12 text-center space-y-3">
					<BellOff className="w-10 h-10 text-brand-purple/30 mx-auto" />
					<h3 className="text-[15px] font-semibold text-brand-navy">
						No notifications yet
					</h3>
					<p className="text-[13px] text-text-secondary">
						We'll let you know when something needs your attention.
					</p>
				</div>
			) : (
				<div className="rounded-2xl border border-border bg-surface overflow-hidden divide-y divide-border">
					{notifications.map(n => (
						<button
							key={n.id}
							onClick={() => !n.isRead && markRead(n.id)}
							className={cn(
								"w-full text-left flex items-start gap-3 px-5 py-4 hover:bg-surface-subtle/40 transition-colors",
								!n.isRead && "bg-brand-purple/[0.04]",
							)}>
							<span className="w-8 h-8 rounded-full bg-brand-purple/10 text-brand-purple-dark flex items-center justify-center flex-shrink-0">
								{TYPE_ICON[n.type]}
							</span>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<p className="text-[14px] font-semibold text-brand-navy">
										{n.title}
									</p>
									{!n.isRead && (
										<span className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0" />
									)}
								</div>
								<p className="text-[13px] text-text-secondary mt-0.5">
									{n.message}
								</p>
								<p className="text-[11px] text-text-muted mt-1.5">
									{timeAgo(n.createdAt)}
								</p>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function NotifSkeleton() {
	return (
		<div className="max-w-2xl mx-auto px-4 py-10 space-y-6 animate-pulse">
			<div className="h-8 w-48 bg-surface-subtle rounded-lg" />
			<div className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden">
				{[1, 2, 3].map(i => (
					<div key={i} className="flex gap-3 px-5 py-4">
						<div className="w-8 h-8 rounded-full bg-surface-subtle flex-shrink-0" />
						<div className="flex-1 space-y-2">
							<div className="h-4 w-1/2 bg-surface-subtle rounded" />
							<div className="h-3 w-3/4 bg-surface-muted rounded" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
