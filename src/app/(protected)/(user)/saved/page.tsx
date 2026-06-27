"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Heart, Trash2, Tag } from "lucide-react";
import Link from "next/link";
import { SavedItem } from "@/features/customer/saved/types";
import { savedApi } from "@/features/customer/saved/api";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SavedClient() {
	const [saved, setSaved] = useState<SavedItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [removingId, setRemovingId] = useState<string | null>(null);

	useEffect(() => {
		savedApi
			.getMySaved()
			.then(setSaved)
			.catch(() => toast.error("Failed to load saved items"))
			.finally(() => setIsLoading(false));
	}, []);

	const handleRemove = async (productId: string) => {
		setRemovingId(productId);
		try {
			await savedApi.removeFromSaved(productId);
			setSaved(prev => prev.filter(s => s.product.id !== productId));
			toast.success("Removed from saved");
		} catch {
			toast.error("Failed to remove item");
		} finally {
			setRemovingId(null);
		}
	};

	if (isLoading) return <SavedSkeleton />;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
			<div className="flex items-center gap-3">
				<Heart className="w-6 h-6 text-[#c8a96e]" />
				<h1 className="text-2xl font-semibold  tracking-tight">
					Saved Items
				</h1>
				<span className="ml-auto text-sm text-[#7c6a4a] bg-[#f5f0e8] px-3 py-1 rounded-full border border-[#e4d8c4]">
					{saved.length} item{saved.length !== 1 ? "s" : ""}
				</span>
			</div>

			{saved.length === 0 ? (
				<EmptyState
					icon={<Heart className="w-12 h-12 text-[#c8a96e]/50" />}
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
							className="rounded-2xl border border-[#e4d8c4] bg-gradient-to-br from-[#fffdf9] to-[#f9f5ee] shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
							<div className="relative">
								<div className="h-44 overflow-hidden bg-[#f0e8d8]">
									<img
										src={item.product.thumbnailUrl}
										alt={item.product.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<button
									onClick={() => handleRemove(item.product.id)}
									disabled={removingId === item.product.id}
									className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-50">
									{removingId === item.product.id ? (
										<span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
									) : (
										<Trash2 className="w-3.5 h-3.5 text-red-400" />
									)}
								</button>
							</div>

							<div className="p-4 space-y-2">
								<Link
									href={`/products/${item.product.slug}`}
									className="text-sm font-semibold text-[#1a1a1a] hover:text-[#c8a96e] transition-colors line-clamp-1 block">
									{item.product.title}
								</Link>

								<div className="flex items-center justify-between">
									<span className="flex items-center gap-1 text-xs text-[#7c6a4a]">
										<Tag className="w-3 h-3" />
										{item.product.category.name}
									</span>
									<span className="text-base font-bold text-[#1a1a1a]">
										${item.product.price.toFixed(2)}
									</span>
								</div>

								<Link
									href={`/products/${item.product.slug}`}
									className="block w-full text-center py-2 bg-[#0d0d0d] hover:bg-[#252525] text-white text-xs font-medium rounded-xl transition-all duration-200 mt-1">
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
			<div className="h-8 w-40 bg-[#e8e0d0] rounded-lg" />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{[1, 2, 3, 4].map(i => (
					<div
						key={i}
						className="rounded-2xl border border-[#e4d8c4] bg-[#fffdf9] overflow-hidden">
						<div className="h-44 bg-[#e8e0d0]" />
						<div className="p-4 space-y-3">
							<div className="h-4 w-3/4 bg-[#e8e0d0] rounded" />
							<div className="h-4 w-1/2 bg-[#f0e8d8] rounded" />
							<div className="h-8 w-full bg-[#e8e0d0] rounded-xl" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
