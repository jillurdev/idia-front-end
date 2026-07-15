import Link from "next/link";
import { Play, Star, Users } from "lucide-react";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
	const reviewCount = product._count?.reviews ?? 0;
	const purchaseCount = product._count?.purchases ?? 0;

	return (
		<Link
			href={`/products/${product.slug}`}
			className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] bg-brand-white rounded-xl overflow-hidden border border-border hover:border-brand-purple/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.10)] transition-all duration-300">
			<div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
				<img
					src={product.thumbnailUrl}
					alt={product.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{product.previewVideoUrl && (
					<div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 group-hover:bg-brand-navy/30 transition-all duration-300">
						<div className="w-10 h-10 rounded-full bg-brand-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
							<Play className="w-4 h-4 text-brand-navy fill-brand-navy ml-0.5" />
						</div>
					</div>
				)}
				<div className="absolute top-3 left-3">
					<span className="px-2 py-0.5 bg-brand-navy/80 backdrop-blur-sm text-brand-white text-[10px] font-medium rounded-full tracking-wide">
						{product.category.name}
					</span>
				</div>
			</div>

			<div className="p-4">
				<h3 className="text-[14px] font-semibold text-brand-navy group-hover:text-brand-purple-dark transition-colors leading-snug">
					{product.title}
				</h3>

				<div className="mt-2 flex items-center justify-between">
					{reviewCount > 0 ? (
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 fill-brand-cyan text-brand-cyan" />
							<span className="text-[11px] text-text-secondary/70 font-medium">
								{reviewCount} {reviewCount === 1 ? "review" : "reviews"}
							</span>
						</div>
					) : (
						<span className="text-[11px] text-text-secondary/40">
							No reviews yet
						</span>
					)}

					<div className="flex items-center gap-1">
						<span className="text-[11px] text-text-secondary/50 font-light">
							from
						</span>
						<span className="font-serif text-[16px] font-semibold text-brand-navy">
							${product.price}
						</span>
					</div>
				</div>

				{purchaseCount > 0 && (
					<div className="mt-2 flex items-center gap-1">
						<Users
							className="w-3 h-3 text-text-secondary/40"
							aria-hidden="true"
						/>
						<span className="text-[11px] text-text-secondary/50 font-light">
							{purchaseCount.toLocaleString()} purchased
						</span>
					</div>
				)}
			</div>
		</Link>
	);
}
