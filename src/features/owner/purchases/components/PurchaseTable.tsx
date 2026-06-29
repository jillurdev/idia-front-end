"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PurchaseStatusBadge } from "./PurchaseStatusBadge";
import type { Purchase } from "../types";

const GATEWAY_LABEL: Record<string, string> = {
	LEMONSQUEEZY: "LemonSqueezy",
	SSLCOMMERZ: "SSLCommerz",
};

interface PurchaseTableProps {
	purchases: Purchase[];
}

export function PurchaseTable({ purchases }: PurchaseTableProps) {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	if (purchases.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No purchases yet.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle">
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Customer
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden md:table-cell">
							Product
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Amount
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Gateway
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Status
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Date
						</th>
						<th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Details
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border bg-surface">
					{purchases.map(purchase => (
						<>
							<tr
								key={purchase.id}
								className="hover:bg-surface-subtle transition-colors">
								{/* Customer */}
								<td className="px-4 py-3">
									<p className="font-medium text-text-primary text-[13px]">
										{purchase.user.name}
									</p>
									<p className="text-[11px] text-text-muted">
										{purchase.user.email}
									</p>
								</td>

								{/* Product */}
								<td className="px-4 py-3 hidden md:table-cell">
									<p className="text-[13px] text-text-primary line-clamp-1">
										{purchase.product.title}
									</p>
								</td>

								{/* Amount */}
								<td className="px-4 py-3">
									<span className="font-medium text-text-primary text-[13px]">
										{purchase.currency === "USD"
											? `$${purchase.pricePaid.toFixed(2)}`
											: `৳${purchase.pricePaid.toLocaleString()}`}
									</span>
								</td>

								{/* Gateway */}
								<td className="px-4 py-3 hidden lg:table-cell">
									<span
										className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
											purchase.gateway === "LEMONSQUEEZY"
												? "bg-brand-purple/10 text-brand-purple-dark"
												: "bg-brand-cyan/10 text-brand-cyan-dark"
										}`}>
										{GATEWAY_LABEL[purchase.gateway]}
									</span>
								</td>

								{/* Status */}
								<td className="px-4 py-3">
									<PurchaseStatusBadge status={purchase.status} />
								</td>

								{/* Date */}
								<td className="px-4 py-3 hidden lg:table-cell">
									<span className="text-[12px] text-text-muted">
										{new Date(purchase.purchasedAt).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "short",
												day: "numeric",
											},
										)}
									</span>
								</td>

								{/* Expand toggle */}
								<td className="px-4 py-3 text-right">
									<button
										onClick={() =>
											setExpandedId(
												expandedId === purchase.id ? null : purchase.id,
											)
										}
										className="p-1.5 rounded-lg text-text-muted hover:text-brand-purple hover:bg-brand-purple/10 transition-colors">
										{expandedId === purchase.id ? (
											<ChevronUp className="w-3.5 h-3.5" />
										) : (
											<ChevronDown className="w-3.5 h-3.5" />
										)}
									</button>
								</td>
							</tr>

							{/* Expanded row */}
							{expandedId === purchase.id && (
								<tr
									key={`${purchase.id}-expanded`}
									className="bg-surface-subtle">
									<td colSpan={7} className="px-6 py-4">
										<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
											<div>
												<p className="text-text-muted mb-0.5">Purchase ID</p>
												<p className="font-mono text-text-primary break-all">
													{purchase.id}
												</p>
											</div>
											<div>
												<p className="text-text-muted mb-0.5">Transaction ID</p>
												<p className="font-mono text-text-primary">
													{purchase.transactionId ?? "—"}
												</p>
											</div>
											<div>
												<p className="text-text-muted mb-0.5">
													Gateway Order ID
												</p>
												<p className="font-mono text-text-primary">
													{purchase.gatewayOrderId ?? "—"}
												</p>
											</div>
											<div>
												<p className="text-text-muted mb-0.5">Currency</p>
												<p className="font-medium text-text-primary">
													{purchase.currency}
												</p>
											</div>
										</div>
									</td>
								</tr>
							)}
						</>
					))}
				</tbody>
			</table>
		</div>
	);
}
