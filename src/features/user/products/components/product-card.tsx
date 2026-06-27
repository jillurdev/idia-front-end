"use client";

import Link from "next/link";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { ProductListItem } from "@/types/product";
import { formatPrice } from "@/lib/utils/currency";

export default function ProductCard({ product }: { product: ProductListItem }) {
	const approvedReviews = product.reviews.filter(r => r.isApproved);
	const avgRating =
		approvedReviews.length > 0
			? approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
				approvedReviews.length
			: 0;

	return (
		<Link
			href={`/products/${product.slug}`}
			className="group bg-white border border-brand-parchment rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
			<div className="relative aspect-[4/3] overflow-hidden bg-brand-parchment/30">
				<img
					src={product.thumbnailUrl}
					alt={product.title}
					className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
				/>

				<div className="absolute top-3 left-3 flex gap-2">
					{product.isFeatured && (
						<span className="px-2.5 py-1 rounded-full bg-brand-gold text-brand-black text-[11px] font-semibold">
							Featured
						</span>
					)}
					<span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-brand-navy text-[11px] font-medium">
						{product.category.name}
					</span>
				</div>
			</div>

			<div className="p-5 space-y-4">
				<div>
					<h3 className="text-lg font-semibold text-brand-navy line-clamp-1">
						{product.title}
					</h3>
					<p className="mt-2 text-sm text-brand-black/60 line-clamp-2">
						{product.description}
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{product.tags.slice(0, 3).map(item => (
						<span
							key={item.tag.id}
							className="px-2.5 py-1 rounded-full bg-brand-white text-brand-gold-dark text-[11px] border border-brand-parchment">
							#{item.tag.name}
						</span>
					))}
				</div>

				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center gap-4 text-brand-black/60">
						<div className="flex items-center gap-1">
							<Star className="w-4 h-4 fill-current text-brand-gold" />
							<span>{avgRating ? avgRating.toFixed(1) : "New"}</span>
						</div>
						<div className="flex items-center gap-1">
							<Eye className="w-4 h-4" />
							<span>{product.viewCount}</span>
						</div>
						<div className="flex items-center gap-1">
							<Heart className="w-4 h-4" />
							<span>{product._count?.saved || 0}</span>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between pt-1">
					<div>
						<p className="text-2xl font-bold text-brand-navy">
							{formatPrice(product.price)}
						</p>
					</div>

					<div className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-brand-navy text-white text-sm font-medium group-hover:bg-brand-gold-dark transition">
						<ShoppingCart className="w-4 h-4" />
						View
					</div>
				</div>
			</div>
		</Link>
	);
}
