"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShoppingBag, Download, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { Purchase } from "../types";
import { purchasesApi } from "../api";

export default function PurchasesClient() {
	const [purchases, setPurchases] = useState<Purchase[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [downloadingId, setDownloadingId] = useState<string | null>(null);

	useEffect(() => {
		purchasesApi
			.getMyPurchases()
			.then(setPurchases)
			.catch(() => toast.error("Failed to load purchases"))
			.finally(() => setIsLoading(false));
	}, []);

	const handleDownload = async (purchaseId: string) => {
		setDownloadingId(purchaseId);
		try {
			const { downloadUrl } = await purchasesApi.downloadProduct(purchaseId);
			window.open(downloadUrl, "_blank");
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Download failed";
			toast.error(message);
		} finally {
			setDownloadingId(null);
		}
	};

	if (isLoading) return <PurchasesSkeleton />;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
			<div className="flex items-center gap-3">
				<ShoppingBag className="w-6 h-6 text-[#c8a96e]" />
				<h1 className="text-2xl font-semibold   tracking-tight">
					My Purchases
				</h1>
				<span className="ml-auto text-sm text-[#7c6a4a] bg-[#f5f0e8] px-3 py-1 rounded-full border border-[#e4d8c4]">
					{purchases.length} item{purchases.length !== 1 ? "s" : ""}
				</span>
			</div>

			{purchases.length === 0 ? (
				<EmptyState
					icon={<ShoppingBag className="w-12 h-12 text-[#c8a96e]/50" />}
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
							className="rounded-2xl border border-[#e4d8c4] bg-gradient-to-br from-[#fffdf9] to-[#f9f5ee] shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
							<div className="flex gap-4 p-4 md:p-5">
								<div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#f0e8d8]">
									<img
										src={purchase.product.thumbnailUrl}
										alt={purchase.product.title}
										className="w-full h-full object-cover"
									/>
								</div>

								<div className="flex-1 min-w-0 space-y-1.5">
									<Link
										href={`/products/${purchase.product.slug}`}
										className="text-base font-semibold text-[#1a1a1a] hover:text-[#c8a96e] transition-colors line-clamp-1">
										{purchase.product.title}
									</Link>

									<div className="flex flex-wrap items-center gap-3 text-xs text-[#7c6a4a]">
										<span className="flex items-center gap-1">
											<Tag className="w-3 h-3" />
											{purchase.product.category.name}
										</span>
										<span className="flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											{new Date(purchase.purchasedAt).toLocaleDateString()}
										</span>
									</div>

									<div className="flex items-center justify-between pt-1">
										<div className="space-y-0.5">
											<p className="text-lg font-bold text-[#1a1a1a]">
												${purchase.pricePaid.toFixed(2)}
											</p>
											<span
												className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
													purchase.status === "COMPLETED"
														? "bg-emerald-50 text-emerald-700 border-emerald-200"
														: purchase.status === "PENDING"
															? "bg-amber-50 text-amber-700 border-amber-200"
															: "bg-red-50 text-red-600 border-red-200"
												}`}>
												{purchase.status}
											</span>
										</div>

										{purchase.status === "COMPLETED" && (
											<button
												onClick={() => handleDownload(purchase.id)}
												disabled={downloadingId === purchase.id}
												className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] hover:bg-[#252525] text-white text-xs font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
												{downloadingId === purchase.id ? (
													<span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
												) : (
													<Download className="w-3.5 h-3.5" />
												)}
												Download
											</button>
										)}
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
			<div className="h-8 w-48 bg-[#e8e0d0] rounded-lg" />
			{[1, 2, 3].map(i => (
				<div
					key={i}
					className="rounded-2xl border border-[#e4d8c4] bg-[#fffdf9] p-5 flex gap-4">
					<div className="w-24 h-24 rounded-xl bg-[#e8e0d0] flex-shrink-0" />
					<div className="flex-1 space-y-3">
						<div className="h-5 w-3/4 bg-[#e8e0d0] rounded" />
						<div className="h-4 w-1/2 bg-[#f0e8d8] rounded" />
						<div className="h-8 w-28 bg-[#e8e0d0] rounded-xl" />
					</div>
				</div>
			))}
		</div>
	);
}
