"use client";

import { usePurchases } from "@/features/owner/purchases/hooks/usePurchases";
import { PurchaseTable } from "@/features/owner/purchases/components/PurchaseTable";
import { PurchaseStats } from "@/features/owner/purchases/components/PurchaseStats";

export default function Purchases () {
	const { data: purchases = [], isLoading } = usePurchases();

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="font-serif text-2xl font-semibold text-brand-navy">
					Purchases
				</h1>
				<p className="text-sm text-text-muted mt-0.5">
					{purchases.length} total purchases
				</p>
			</div>

			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<>
					<PurchaseStats purchases={purchases} />
					<PurchaseTable purchases={purchases} />
				</>
			)}
		</div>
	);
}
