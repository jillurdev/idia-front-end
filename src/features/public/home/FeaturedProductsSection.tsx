"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useProducts } from "@/features/public/product/hooks/useProducts";
import { ProductCard } from "@/features/public/product/components/Productcard";

export default function FeaturedProductsSection() {
	const { data, isLoading } = useProducts({
		page: 1,
		limit: 8,
		isFeatured: true,
	});

	const products = data?.products ?? [];

	// A brand-new store with nothing marked "featured" yet — skip the
	// section instead of showing an empty shelf.
	if (!isLoading && products.length === 0) return null;

	return (
		<section className="py-24 bg-surface-subtle/40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Handpicked"
					title="Featured Products"
					subtitle="Our team's favourite picks — high quality, ready to drop into your next project."
				/>

				<div className="mt-12 flex flex-wrap gap-6">
					{isLoading
						? Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] aspect-[4/3.6] rounded-xl bg-surface-subtle animate-pulse"
								/>
							))
						: products.map(product => (
								<ProductCard key={product.id} product={product} />
							))}
				</div>

				<div className="mt-10 text-center">
					<Link
						href="/products"
						className="inline-flex items-center gap-2 text-[13px] text-brand-purple-dark hover:text-brand-purple font-medium transition-colors group">
						View all products
						<ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
