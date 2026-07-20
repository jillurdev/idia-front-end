import Link from "next/link";
import { X, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/features/user/notifications/hooks/useNotifications";
import { useMarkNotificationRead } from "@/features/user/notifications/hooks/useMarkNotificationRead";

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

export function NotifDropdown({ onClose }: { onClose: () => void }) {
	const { notifications, isLoading } = useNotifications();
	const { markRead, markAllRead } = useMarkNotificationRead();
	const recent = notifications.slice(0, 6);

	return (
		<div className="absolute right-0 top-full mt-2 w-80 bg-brand-white border border-surface-subtle rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			<div className="px-4 py-3 border-b border-surface-subtle flex items-center justify-between">
				<p className="text-[13px] font-semibold text-brand-navy">
					Notifications
				</p>
				<div className="flex items-center gap-3">
					{notifications.some(n => !n.isRead) && (
						<button
							onClick={() => markAllRead()}
							className="text-[10px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
							Mark all read
						</button>
					)}
					<button
						onClick={onClose}
						className="text-brand-black/30 hover:text-brand-navy">
						<X className="w-3.5 h-3.5" />
					</button>
				</div>
			</div>

			<div className="max-h-72 overflow-y-auto divide-y divide-surface-subtle/60">
				{isLoading ? (
					<div className="px-4 py-8 text-center text-[12px] text-brand-black/30">
						Loading…
					</div>
				) : recent.length === 0 ? (
					<div className="px-4 py-10 flex flex-col items-center gap-2 text-center">
						<BellOff className="w-5 h-5 text-brand-black/20" />
						<p className="text-[12px] text-brand-black/40">
							No notifications yet
						</p>
					</div>
				) : (
					recent.map(n => (
						<button
							key={n.id}
							onClick={() => !n.isRead && markRead(n.id)}
							className={cn(
								"w-full text-left px-4 py-3 hover:bg-surface-subtle/30 transition-colors cursor-pointer",
								!n.isRead && "bg-brand-purple/5",
							)}>
							<div className="flex items-start gap-2.5">
								{!n.isRead && (
									<span className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0 mt-1.5" />
								)}
								<div className={cn(!n.isRead ? "" : "pl-4")}>
									<p className="text-[12px] font-semibold text-brand-navy">
										{n.title}
									</p>
									<p className="text-[11px] text-brand-black/50 mt-0.5 leading-relaxed line-clamp-2">
										{n.message}
									</p>
									<p className="text-[10px] text-brand-black/30 mt-1">
										{timeAgo(n.createdAt)}
									</p>
								</div>
							</div>
						</button>
					))
				)}
			</div>

			<div className="px-4 py-2.5 border-t border-surface-subtle text-center">
				<Link
					href="/notifications"
					onClick={onClose}
					className="text-[11px] text-brand-purple-dark hover:text-brand-purple font-medium transition-colors">
					View all notifications →
				</Link>
			</div>
		</div>
	);
}
