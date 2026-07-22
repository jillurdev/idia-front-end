"use client";

import Link from "next/link";
import {
	ShoppingBag,
	Download,
	Calendar,
	CheckCircle2,
	RotateCcw,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMyPurchases } from "../hooks/useMyPurchases";
import type { PurchaseStatus } from "../types";
import { useDownload } from "../../downloads/hooks/useDownload";
import { useCheckout } from "../hooks/useCheckout";

const STATUS_STYLES: Record<PurchaseStatus, string> = {
	COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	FAILED: "bg-red-50 text-red-600 border-red-200",
	REFUNDED: "bg-surface-muted text-text-muted border-border",
};

export default function PurchasesClient() {
	const { data: allPurchases = [], isLoading } = useMyPurchases();
	// PENDING rows exist from the moment checkout starts, before payment —
	// if the buyer never completes payment, no webhook arrives and it never
	// resolves. Those (and FAILED ones) aren't real purchases, so we hide
	// them here rather than show a misleading "pending" order forever.
	const purchases = allPurchases.filter(
		p => p.status === "COMPLETED" || p.status === "REFUNDED",
	);
	const { download, downloadingId } = useDownload();
	const { buyNow, isPending: isBuyingAgain } = useCheckout();

	if (isLoading) return <PurchasesSkeleton />;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
			<div className="flex items-center gap-3">
				<ShoppingBag className="w-6 h-6 text-brand-purple-dark" />
				<h1 className="font-serif text-2xl font-semibold text-brand-navy tracking-tight">
					My Purchases
				</h1>
				<span className="ml-auto text-[12px] text-text-secondary bg-surface-subtle px-3 py-1 rounded-full border border-border">
					{purchases.length} item{purchases.length !== 1 ? "s" : ""}
				</span>
			</div>

			{purchases.length === 0 ? (
				<EmptyState
					icon={<ShoppingBag className="w-12 h-12 text-brand-purple/40" />}
					title="No purchases yet"
					description="Browse our collection and find something you love."
					href="/products"
					linkLabel="Explore products"
				/>
			) : (
				<div className="space-y-4">
					{purchases.map(purchase => (
						<div
							key={purchase.id}
							className="rounded-2xl border border-border bg-surface overflow-hidden">
							<div className="flex gap-4 p-4 md:p-5">
								<div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-subtle">
									<img
										src={purchase.product.thumbnailUrl}
										alt={purchase.product.title}
										className="w-full h-full object-cover"
									/>
								</div>

								<div className="flex-1 min-w-0 space-y-1.5">
									<Link
										href={`/products/${purchase.product.slug}`}
										className="text-[15px] font-semibold text-brand-navy hover:text-brand-purple-dark transition-colors line-clamp-1">
										{purchase.product.title}
									</Link>

									<div className="flex items-center gap-1 text-[12px] text-text-muted">
										<Calendar className="w-3 h-3" />
										{new Date(purchase.purchasedAt).toLocaleDateString()}
									</div>

									<div className="flex items-center justify-between pt-1">
										<div className="space-y-0.5">
											<p className="text-lg font-bold text-brand-navy">
												{purchase.currency === "USD" ? "$" : "৳"}
												{purchase.pricePaid.toFixed(2)}
											</p>
											<span
												className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${STATUS_STYLES[purchase.status]}`}>
												{purchase.status}
											</span>
										</div>

										{purchase.status === "COMPLETED" &&
											(purchase._count.downloads > 0 ? (
												<div className="flex items-center gap-2">
													<span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600">
														<CheckCircle2 className="w-3.5 h-3.5" />
														Downloaded
													</span>
													<button
														onClick={() =>
															buyNow([purchase.product.id], "/purchases")
														}
														disabled={isBuyingAgain}
														className="flex items-center gap-1.5 px-3.5 py-2 border border-brand-purple text-brand-purple-dark hover:bg-brand-purple/10 text-[12px] font-medium rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
														<RotateCcw className="w-3.5 h-3.5" />
														Buy again
													</button>
												</div>
											) : (
												<button
													onClick={() => download(purchase.product.id)}
													disabled={downloadingId === purchase.product.id}
													className="flex items-center gap-2 px-4 py-2 bg-brand-navy hover:bg-[#252550] text-brand-white text-[12px] font-medium rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
													{downloadingId === purchase.product.id ? (
														<span className="w-3.5 h-3.5 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
													) : (
														<Download className="w-3.5 h-3.5" />
													)}
													Download
												</button>
											))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function PurchasesSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-pulse">
			<div className="h-8 w-48 bg-surface-subtle rounded-lg" />
			{[1, 2, 3].map(i => (
				<div
					key={i}
					className="rounded-2xl border border-border bg-surface p-5 flex gap-4">
					<div className="w-24 h-24 rounded-xl bg-surface-subtle flex-shrink-0" />
					<div className="flex-1 space-y-3">
						<div className="h-5 w-3/4 bg-surface-subtle rounded" />
						<div className="h-4 w-1/2 bg-surface-muted rounded" />
						<div className="h-8 w-28 bg-surface-subtle rounded-xl" />
					</div>
				</div>
			))}
		</div>
	);
}
