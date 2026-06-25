import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCTS } from "../data/home";

export default function FeaturedSection() {
	return (
		<section className="py-24 bg-surface-subtle">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Handpicked"
					title="Featured Assets"
					subtitle="Our most celebrated products — loved by thousands of creators worldwide."
				/>

				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{FEATURED_PRODUCTS.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/products"
						className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-brand-navy text-brand-white text-[13px] font-medium tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-colors duration-200 group">
						Browse All Products
						<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
