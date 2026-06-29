import type { Purchase } from "../types";

interface PurchaseStatsProps {
	purchases: Purchase[];
}

export function PurchaseStats({ purchases }: PurchaseStatsProps) {
	const completed = purchases.filter(p => p.status === "COMPLETED");
	const totalUsd = completed
		.filter(p => p.currency === "USD")
		.reduce((sum, p) => sum + p.pricePaid, 0);
	const totalBdt = completed
		.filter(p => p.currency === "BDT")
		.reduce((sum, p) => sum + p.pricePaid, 0);
	const pending = purchases.filter(p => p.status === "PENDING").length;
	const refunded = purchases.filter(p => p.status === "REFUNDED").length;

	const stats = [
		{
			label: "Total Revenue (USD)",
			value: `$${totalUsd.toFixed(2)}`,
			sub: `${completed.filter(p => p.currency === "USD").length} orders`,
			color: "text-brand-purple",
		},
		{
			label: "Total Revenue (BDT)",
			value: `৳${totalBdt.toLocaleString()}`,
			sub: `${completed.filter(p => p.currency === "BDT").length} orders`,
			color: "text-brand-cyan-dark",
		},
		{
			label: "Pending",
			value: pending.toString(),
			sub: "awaiting payment",
			color: "text-amber-600",
		},
		{
			label: "Refunded",
			value: refunded.toString(),
			sub: "total refunds",
			color: "text-red-500",
		},
	];

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
			{stats.map(stat => (
				<div
					key={stat.label}
					className="bg-surface rounded-xl border border-border px-5 py-4">
					<p className="text-[11px] uppercase tracking-wider text-text-muted font-medium mb-2">
						{stat.label}
					</p>
					<p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
					<p className="text-[11px] text-text-muted mt-0.5">{stat.sub}</p>
				</div>
			))}
		</div>
	);
}
