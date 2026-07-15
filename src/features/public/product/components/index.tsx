"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { useCategories } from "@/features/public/categories/hooks/useCategories";
import { useSearchParams } from "next/navigation";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./Productcard";

export default function ProductsPage() {
	const searchParams = useSearchParams();
	const activeCategorySlug = searchParams.get("category") ?? "all";

	const { data: categories } = useCategories();
	const activeCategory = categories?.find(c => c.slug === activeCategorySlug);

	const {
		data: products,
		isLoading,
		isError,
	} = useProducts(
		activeCategory ? { categoryId: activeCategory.id } : undefined,
	);

	return (
		<div className="bg-brand-white">
			{/* Hero */}
			<section className="relative bg-brand-navy py-20 overflow-hidden">
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-purple/5" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-brand-cyan/8" />
				</div>
				<div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan/70 font-medium mb-4">
						The Collection
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Browse All Assets
					</h1>
					<p className="mt-4 text-brand-white/50 text-[15px] font-light leading-relaxed">
						Premium motion graphics, templates, and digital assets — ready to
						download and use today.
					</p>
				</div>
			</section>

			{/* Filter bar */}
			<section className="border-b border-border bg-brand-white sticky top-0 z-20 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
					<SlidersHorizontal
						className="w-4 h-4 text-text-secondary/40 flex-shrink-0"
						aria-hidden="true"
					/>
					<Link
						href="/products"
						className={`px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${
							activeCategorySlug === "all"
								? "bg-brand-purple-dark text-brand-white"
								: "bg-surface-subtle text-text-secondary/70 hover:bg-brand-purple/10 hover:text-brand-purple-dark"
						}`}>
						All
					</Link>
					{categories?.map(cat => (
						<Link
							key={cat.slug}
							href={`/products?category=${cat.slug}`}
							className={`px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${
								activeCategorySlug === cat.slug
									? "bg-brand-purple-dark text-brand-white"
									: "bg-surface-subtle text-text-secondary/70 hover:bg-brand-purple/10 hover:text-brand-purple-dark"
							}`}>
							{cat.name}
						</Link>
					))}
				</div>
			</section>

			{/* Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{isLoading && (
						<p className="text-center text-text-secondary/60 text-sm py-16">
							Loading assets…
						</p>
					)}

					{isError && (
						<p className="text-center text-red-600 text-sm py-16">
							Failed to load products.
						</p>
					)}

					{products && (
						<>
							<p className="text-[13px] text-text-secondary/60 mb-8">
								Showing {products.length}{" "}
								{products.length === 1 ? "asset" : "assets"}
								{activeCategory && <> in {activeCategory.name}</>}
							</p>

							{products.length === 0 ? (
								<p className="text-center text-text-secondary/60 text-sm py-16">
									No assets in this category yet.
								</p>
							) : (
								<div className="flex flex-wrap justify-center gap-6">
									{products.map(product => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</div>
	);
}
