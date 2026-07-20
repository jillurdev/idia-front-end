"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Trash2, Tag, ShoppingBag, Check } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMySaved } from "../hooks/useMySaved";
import { useToggleSaved } from "../hooks/useToggleSaved";
import { useCheckout } from "@/features/user/purchases/hooks/useCheckout";

export default function SavedClient() {
	const { data: saved = [], isLoading } = useMySaved();
	const { toggle, togglingId } = useToggleSaved();
	const { buyNow, isPending } = useCheckout();
	const pathname = usePathname();

	const [selected, setSelected] = useState<Set<string>>(new Set());

	const toggleSelect = (productId: string) => {
		setSelected(prev => {
			const next = new Set(prev);
			next.has(productId) ? next.delete(productId) : next.add(productId);
			return next;
		});
	};

	const selectedItems = saved.filter(item => selected.has(item.product.id));
	const selectedTotal = selectedItems.reduce(
		(sum, item) => sum + item.product.price,
		0,
	);

	if (isLoading) return <SavedSkeleton />;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 pb-28 space-y-6">
			<div className="flex items-center gap-3">
				<Heart className="w-6 h-6 text-brand-purple-dark" />
				<h1 className="font-serif text-2xl font-semibold text-brand-navy tracking-tight">
					Saved Items
				</h1>
				<span className="ml-auto text-[12px] text-text-secondary bg-surface-subtle px-3 py-1 rounded-full border border-border">
					{saved.length} item{saved.length !== 1 ? "s" : ""}
				</span>
			</div>

			{saved.length === 0 ? (
				<EmptyState
					icon={<Heart className="w-12 h-12 text-brand-purple/40" />}
					title="Nothing saved yet"
					description="Save products you love and find them here anytime."
					href="/products"
					linkLabel="Explore products"
				/>
			) : (
				<>
					{saved.length > 1 && (
						<button
							onClick={() =>
								setSelected(
									selected.size === saved.length
										? new Set()
										: new Set(saved.map(i => i.product.id)),
								)
							}
							className="text-[12px] font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">
							{selected.size === saved.length ? "Deselect all" : "Select all"}
						</button>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{saved.map(item => {
							const isChecked = selected.has(item.product.id);
							return (
								<div
									key={item.id}
									className={`rounded-2xl border overflow-hidden group transition-colors ${
										isChecked
											? "border-brand-purple bg-brand-purple/[0.03]"
											: "border-border bg-surface"
									}`}>
									<div className="relative">
										<div className="h-44 overflow-hidden bg-surface-subtle">
											<img
												src={item.product.thumbnailUrl}
												alt={item.product.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										</div>

										{/* Selection checkbox for bulk checkout */}
										<button
											onClick={() => toggleSelect(item.product.id)}
											aria-label={isChecked ? "Deselect item" : "Select item"}
											className={`absolute top-3 left-3 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
												isChecked
													? "bg-brand-purple border-brand-purple"
													: "bg-brand-white/90 border-brand-white/90"
											}`}>
											{isChecked && (
												<Check className="w-3.5 h-3.5 text-brand-white" />
											)}
										</button>

										<button
											onClick={() => toggle(item.product.id)}
											disabled={togglingId === item.product.id}
											className="absolute top-3 right-3 w-8 h-8 bg-brand-white/90 hover:bg-red-50 rounded-full flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-50"
											aria-label="Remove from saved">
											{togglingId === item.product.id ? (
												<span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
											) : (
												<Trash2 className="w-3.5 h-3.5 text-red-400" />
											)}
										</button>
									</div>

									<div className="p-4 space-y-2">
										<Link
											href={`/products/${item.product.slug}`}
											className="text-[14px] font-semibold text-brand-navy hover:text-brand-purple-dark transition-colors line-clamp-1 block">
											{item.product.title}
										</Link>

										<div className="flex items-center justify-between">
											<span className="flex items-center gap-1 text-[12px] text-text-muted">
												<Tag className="w-3 h-3" />
												{item.product.category.name}
											</span>
											<span className="text-base font-bold text-brand-navy">
												${item.product.price.toFixed(2)}
											</span>
										</div>

										<div className="flex gap-2 pt-1">
											<Link
												href={`/products/${item.product.slug}`}
												className="flex-1 text-center py-2 border border-border text-brand-navy text-[12px] font-medium rounded-[6px] hover:bg-surface-subtle/50 transition-colors">
												View
											</Link>
											<button
												onClick={() => buyNow([item.product.id], pathname)}
												disabled={isPending}
												className="flex-1 py-2 bg-brand-navy hover:bg-[#252550] text-brand-white text-[12px] font-medium rounded-[6px] transition-colors disabled:opacity-50">
												Buy Now
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}

			{/* Sticky bulk-checkout bar — appears once 2+ items are selected */}
			{selectedItems.length > 0 && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-navy text-brand-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
					<div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
						<ShoppingBag className="w-5 h-5 text-brand-purple-light flex-shrink-0" />
						<div className="flex-1 min-w-0">
							<p className="text-[13px] font-medium">
								{selectedItems.length} item
								{selectedItems.length !== 1 ? "s" : ""} selected
							</p>
							<p className="text-[11px] text-brand-white/50">
								One checkout, one payment — save on transaction fees
							</p>
						</div>
						<span className="text-lg font-bold whitespace-nowrap">
							${selectedTotal.toFixed(2)}
						</span>
						<button
							onClick={() => buyNow(Array.from(selected), pathname)}
							disabled={isPending}
							className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-brand-white text-[13px] font-semibold rounded-[6px] transition-colors disabled:opacity-60 whitespace-nowrap">
							{isPending ? "Redirecting…" : "Buy Selected"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function SavedSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-pulse">
			<div className="h-8 w-40 bg-surface-subtle rounded-lg" />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{[1, 2, 3, 4].map(i => (
					<div
						key={i}
						className="rounded-2xl border border-border bg-surface overflow-hidden">
						<div className="h-44 bg-surface-subtle" />
						<div className="p-4 space-y-3">
							<div className="h-4 w-3/4 bg-surface-subtle rounded" />
							<div className="h-4 w-1/2 bg-surface-muted rounded" />
							<div className="h-8 w-full bg-surface-subtle rounded-xl" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
