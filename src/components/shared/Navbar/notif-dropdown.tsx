import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotifDropdown({ onClose }: { onClose: () => void }) {
	const notifs = [
		{
			id: 1,
			title: "Purchase Successful",
			message: "Epic Logo Reveal is ready to download.",
			time: "2m ago",
			read: false,
		},
		{
			id: 2,
			title: "New Product",
			message: "Motion Pack Vol. 3 just dropped!",
			time: "1h ago",
			read: false,
		},
		{
			id: 3,
			title: "Review Approved",
			message: "Your review on Cinematic Titles is live.",
			time: "Yesterday",
			read: true,
		},
	];

	return (
		<div className="absolute right-0 top-full mt-2 w-80 bg-brand-white border border-surface-subtle rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden animate-fade-in z-50">
			<div className="px-4 py-3 border-b border-surface-subtle flex items-center justify-between">
				<p className="text-[13px] font-semibold text-brand-navy">
					Notifications
				</p>
				<button
					onClick={onClose}
					className="text-brand-black/30 hover:text-brand-navy">
					<X className="w-3.5 h-3.5" />
				</button>
			</div>

			<div className="max-h-72 overflow-y-auto divide-y divide-surface-subtle/60">
				{notifs.map(n => (
					<div
						key={n.id}
						className={cn(
							"px-4 py-3 hover:bg-surface-subtle/30 transition-colors cursor-pointer",
							!n.read && "bg-brand-purple/5",
						)}>
						<div className="flex items-start gap-2.5">
							{!n.read && (
								<span className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0 mt-1.5" />
							)}
							<div className={cn(!n.read ? "" : "pl-4")}>
								<p className="text-[12px] font-semibold text-brand-navy">
									{n.title}
								</p>
								<p className="text-[11px] text-brand-black/50 mt-0.5 leading-relaxed">
									{n.message}
								</p>
								<p className="text-[10px] text-brand-black/30 mt-1">{n.time}</p>
							</div>
						</div>
					</div>
				))}
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
