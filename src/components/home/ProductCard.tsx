import Link from "next/link";
import { Play, Star } from "lucide-react";
import { ProductItem } from "@/types/home";

type Props = {
	product: ProductItem;
};

export default function ProductCard({ product }: Props) {
	return (
		<Link
			href={`/products/${product.slug}`}
			className="group bg-brand-white rounded-xl overflow-hidden border border-border hover:border-brand-purple/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.10)] transition-all duration-300">
			<div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
				<img
					src={product.thumbnailUrl}
					alt={product.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				<div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 group-hover:bg-brand-navy/30 transition-all duration-300">
					<div className="w-10 h-10 rounded-full bg-brand-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
						<Play className="w-4 h-4 text-brand-navy fill-brand-navy ml-0.5" />
					</div>
				</div>

				<div className="absolute top-3 left-3">
					<span className="px-2 py-0.5 bg-brand-navy/80 backdrop-blur-sm text-brand-white text-[10px] font-medium rounded-full tracking-wide">
						{product.category}
					</span>
				</div>
			</div>

			<div className="p-4">
				<h3 className="text-[14px] font-semibold text-brand-navy group-hover:text-brand-purple-dark transition-colors leading-snug">
					{product.title}
				</h3>

				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-1">
						<Star className="w-3 h-3 fill-brand-cyan text-brand-cyan" />
						<span className="text-[11px] text-text-secondary/60 font-medium">
							{product.rating}
						</span>
						<span className="text-[11px] text-text-secondary/40">
							({product.reviewCount})
						</span>
					</div>

					<div className="flex items-center gap-1">
						<span className="text-[11px] text-text-secondary/40 font-light">
							from
						</span>
						<span className="font-serif text-[16px] font-semibold text-brand-navy">
							${product.price}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
