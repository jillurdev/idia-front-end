import Link from "next/link";
import { Star, Play, SlidersHorizontal, Users } from "lucide-react";
import { PRODUCTS } from "@/lib/data/product";

const CATEGORIES = [
	{ name: "All", slug: "all" },
	{ name: "Intro & Outro", slug: "intro-outro" },
	{ name: "Lower Thirds", slug: "lower-thirds" },
	{ name: "Transitions", slug: "transitions" },
	{ name: "Logo Reveals", slug: "logo-reveals" },
	{ name: "Titles & Text", slug: "titles-text" },
	{ name: "Social Media Packs", slug: "social-media-packs" },
];

export const metadata = {
	title: "Browse Products",
};

export default async function ProductsPage({
	searchParams,
}: {
	searchParams?: Promise<{ category?: string }>;
}) {
	const resolvedSearchParams = await searchParams;
	const activeCategory = resolvedSearchParams?.category ?? "all";

	const products =
		activeCategory === "all"
			? PRODUCTS
			: PRODUCTS.filter(p => p.categorySlug === activeCategory);

	const activeCategoryLabel =
		CATEGORIES.find(c => c.slug === activeCategory)?.name ?? "All";

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
					{CATEGORIES.map(cat => {
						const isActive = activeCategory === cat.slug;
						return (
							<Link
								key={cat.slug}
								href={
									cat.slug === "all"
										? "/products"
										: `/products?category=${cat.slug}`
								}
								aria-pressed={isActive}
								className={`px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${
									isActive
										? "bg-brand-purple-dark text-brand-white"
										: "bg-surface-subtle text-text-secondary/70 hover:bg-brand-purple/10 hover:text-brand-purple-dark"
								}`}>
								{cat.name}
							</Link>
						);
					})}
				</div>
			</section>

			{/* Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-[13px] text-text-secondary/60 mb-8">
						Showing {products.length}{" "}
						{products.length === 1 ? "asset" : "assets"}
						{activeCategory !== "all" && <> in {activeCategoryLabel}</>}
					</p>

					{products.length === 0 ? (
						<p className="text-center text-text-secondary/60 text-sm py-16">
							No assets in this category yet.
						</p>
					) : (
						<div className="flex flex-wrap justify-center gap-6">
							{products.map(product => (
								<Link
									key={product.id}
									href={`/products/${product.slug}`}
									className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] bg-brand-white rounded-xl overflow-hidden border border-border hover:border-brand-purple/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.10)] transition-all duration-300">
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
												<span className="text-[11px] text-text-secondary/70 font-medium">
													{product.rating}
												</span>
												<span className="text-[11px] text-text-secondary/50">
													({product.reviewCount})
												</span>
											</div>

											<div className="flex items-center gap-1">
												<span className="text-[11px] text-text-secondary/50 font-light">
													from
												</span>
												<span className="font-serif text-[16px] font-semibold text-brand-navy">
													${product.price}
												</span>
											</div>
										</div>

										<div className="mt-2 flex items-center gap-1">
											<Users
												className="w-3 h-3 text-text-secondary/40"
												aria-hidden="true"
											/>
											<span className="text-[11px] text-text-secondary/50 font-light">
												{product.purchaseCount.toLocaleString()} purchased
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
