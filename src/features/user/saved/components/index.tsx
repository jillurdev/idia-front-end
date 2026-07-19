"use client";

import Link from "next/link";
import { Heart, Trash2, Tag } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMySaved } from "../hooks/useMySaved";
import { useToggleSaved } from "../hooks/useToggleSaved";

export default function SavedClient() {
	const { data: saved = [], isLoading } = useMySaved();
	const { toggle, togglingId } = useToggleSaved();

	if (isLoading) return <SavedSkeleton />;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
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
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{saved.map(item => (
						<div
							key={item.id}
							className="rounded-2xl border border-border bg-surface overflow-hidden group">
							<div className="relative">
								<div className="h-44 overflow-hidden bg-surface-subtle">
									<img
										src={item.product.thumbnailUrl}
										alt={item.product.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
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

								<Link
									href={`/products/${item.product.slug}`}
									className="block w-full text-center py-2 bg-brand-navy hover:bg-[#252550] text-brand-white text-[12px] font-medium rounded-[6px] transition-colors mt-1">
									View Product
								</Link>
							</div>
						</div>
					))}
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
