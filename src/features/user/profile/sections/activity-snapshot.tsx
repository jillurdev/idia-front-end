"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Bookmark, Star, Download } from "lucide-react";
import Link from "next/link";

interface ActivityStats {
	purchases: number;
	likes: number;
	saved: number;
	reviews: number;
	downloads: number;
}

interface Props {
	user: any;
}

export default function ActivitySnapshot({ user }: Props) {
	const [stats, setStats] = useState<ActivityStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/user/stats")
			.then(r => r.json())
			.then(data => {
				setStats(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const items = [
		{
			icon: ShoppingBag,
			label: "Purchases",
			value: stats?.purchases ?? 0,
			href: "/purchases",
			color: "#c8a96e",
			bg: "#fdf6e8",
		},
		{
			icon: Heart,
			label: "Liked",
			value: stats?.likes ?? 0,
			href: "/liked",
			color: "#e87070",
			bg: "#fef2f2",
		},
		{
			icon: Bookmark,
			label: "Saved",
			value: stats?.saved ?? 0,
			href: "/saved",
			color: "#7c6a4a",
			bg: "#f5f0e8",
		},
		{
			icon: Star,
			label: "Reviews",
			value: stats?.reviews ?? 0,
			href: "#reviews",
			color: "#f59e0b",
			bg: "#fffbeb",
		},
		{
			icon: Download,
			label: "Downloads",
			value: stats?.downloads ?? 0,
			href: "/purchases",
			color: "#6b9e7a",
			bg: "#f0faf3",
		},
	];

	return (
		<div className="space-y-5">
			<h2 className="text-[15px] font-semibold text-[#0d0d0d]">
				Your activity
			</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
				{items.map(({ icon: Icon, label, value, href, color, bg }) => (
					<Link
						key={label}
						href={href}
						className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-[#eadfce] hover:border-[#c8a96e] hover:shadow-md transition-all duration-200 text-center"
						style={{ backgroundColor: bg }}>
						<div
							className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
							style={{ backgroundColor: `${color}20` }}>
							<Icon
								className="w-4.5 h-4.5"
								style={{ color }}
								strokeWidth={1.8}
							/>
						</div>
						{loading ? (
							<div className="h-6 w-8 rounded bg-[#e8e0d0] animate-pulse" />
						) : (
							<span className="text-xl font-bold text-[#0d0d0d]">{value}</span>
						)}
						<span className="text-[11px] text-[#9c8e7e] font-medium">
							{label}
						</span>
					</Link>
				))}
			</div>

			{/* Recent purchases preview */}
			<RecentPurchases />
		</div>
	);
}

function RecentPurchases() {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/user/purchases?limit=3")
			.then(r => r.json())
			.then(data => {
				setItems(data.purchases ?? []);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (!loading && items.length === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h3 className="text-[13px] font-semibold text-[#5c5244]">
					Recent purchases
				</h3>
				<Link
					href="/purchases"
					className="text-[11px] text-[#c8a96e] hover:text-[#b8996e] font-medium transition-colors">
					View all →
				</Link>
			</div>

			<div className="space-y-2">
				{loading
					? Array(3)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className="h-14 rounded-xl bg-[#f5f0e8] animate-pulse"
								/>
							))
					: items.map(item => (
							<Link
								key={item.id}
								href={`/products/${item.product.slug}`}
								className="flex items-center gap-3 p-3 rounded-xl border border-[#eadfce] bg-[#faf7f2] hover:border-[#c8a96e] transition-colors group">
								{item.product.thumbnailUrl && (
									<img
										src={item.product.thumbnailUrl}
										alt={item.product.title}
										className="w-10 h-10 rounded-lg object-cover shrink-0"
									/>
								)}
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium text-[#0d0d0d] truncate group-hover:text-[#c8a96e] transition-colors">
										{item.product.title}
									</p>
									<p className="text-[11px] text-[#9c8e7e]">
										৳{item.pricePaid} ·{" "}
										{new Date(item.purchasedAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						))}
			</div>
		</div>
	);
}
