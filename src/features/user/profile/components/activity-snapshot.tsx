"use client";

import Link from "next/link";
import { ShoppingBag, Bookmark, Star } from "lucide-react";
import type { UserResponse } from "@/types/user";
import { useMyPurchases } from "@/features/user/purchases/hooks/useMyPurchases";
import { useMySaved } from "@/features/user/saved/hooks/useMySaved";
import { useMyReviews } from "@/features/user/reviews/hooks/useMyReviews";

interface Props {
	user: UserResponse;
}

export default function ActivitySnapshot({ user }: Props) {
	const { data: purchases = [], isLoading: purchasesLoading } =
		useMyPurchases();
	const { data: saved = [], isLoading: savedLoading } = useMySaved();
	const { data: reviews = [], isLoading: reviewsLoading } = useMyReviews();

	const loading = purchasesLoading || savedLoading || reviewsLoading;

	const items = [
		{
			icon: ShoppingBag,
			label: "Purchases",
			value: purchases.length,
			href: "/purchases",
		},
		{
			icon: Bookmark,
			label: "Saved",
			value: saved.length,
			href: "/saved",
		},
		{
			icon: Star,
			label: "Reviews",
			value: reviews.length,
			href: "/profile?tab=reviews",
		},
	];

	return (
		<div className="space-y-5">
			<h2 className="text-[15px] font-semibold text-brand-navy">
				Your activity
			</h2>

			<div className="grid grid-cols-3 gap-3">
				{items.map(({ icon: Icon, label, value, href }) => (
					<Link
						key={label}
						href={href}
						className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-brand-purple/[0.03] hover:border-brand-purple/40 hover:shadow-md transition-all duration-200 text-center">
						<div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
							<Icon
								className="w-[18px] h-[18px] text-brand-purple-dark"
								strokeWidth={1.8}
							/>
						</div>
						{loading ? (
							<div className="h-6 w-8 rounded bg-surface-subtle animate-pulse" />
						) : (
							<span className="text-xl font-bold text-brand-navy">{value}</span>
						)}
						<span className="text-[11px] text-text-muted font-medium">
							{label}
						</span>
					</Link>
				))}
			</div>

			{/* Recent purchases preview */}
			<RecentPurchases purchases={purchases} loading={purchasesLoading} />
		</div>
	);
}

function RecentPurchases({
	purchases,
	loading,
}: {
	purchases: ReturnType<typeof useMyPurchases>["data"];
	loading: boolean;
}) {
	const items = (purchases ?? []).slice(0, 3);

	if (!loading && items.length === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h3 className="text-[13px] font-semibold text-text-secondary">
					Recent purchases
				</h3>
				<Link
					href="/purchases"
					className="text-[11px] text-brand-purple-dark hover:text-brand-purple font-medium transition-colors">
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
									className="h-14 rounded-xl bg-surface-subtle animate-pulse"
								/>
							))
					: items.map(item => (
							<Link
								key={item.id}
								href={`/products/${item.product.slug}`}
								className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface-subtle/40 hover:border-brand-purple/40 transition-colors group">
								<img
									src={item.product.thumbnailUrl}
									alt={item.product.title}
									className="w-10 h-10 rounded-lg object-cover shrink-0 bg-surface-subtle"
								/>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium text-brand-navy truncate group-hover:text-brand-purple-dark transition-colors">
										{item.product.title}
									</p>
									<p className="text-[11px] text-text-muted">
										{item.currency === "USD" ? "$" : "৳"}
										{item.pricePaid.toFixed(2)} ·{" "}
										{new Date(item.purchasedAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						))}
			</div>
		</div>
	);
}
