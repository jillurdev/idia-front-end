"use client";

import Link from "next/link";
import { useCategories } from "@/features/public/categories/hooks/useCategories";

export default function CategoriesClient() {
	const { data: categories, isLoading, isError } = useCategories();

	return (
		<div className="bg-brand-white">
			{/* Hero */}
			<section className="relative bg-brand-navy py-24 overflow-hidden">
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-purple/5" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-brand-cyan/8" />
				</div>
				<div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan/70 font-medium mb-4">
						Explore
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Browse by Category
					</h1>
					<p className="mt-4 text-brand-white/50 text-[15px] font-light leading-relaxed">
						Every asset meticulously organised — find exactly what your project
						needs.
					</p>
				</div>
			</section>

			{/* Grid */}
			<section className="py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{isLoading && (
						<p className="text-center text-text-secondary/50 text-sm">
							Loading…
						</p>
					)}
					{isError && (
						<p className="text-center text-red-600 text-sm">
							Failed to load categories.
						</p>
					)}

					{categories && categories.length === 0 && (
						<p className="text-center text-text-secondary/50 text-sm">
							No categories available yet.
						</p>
					)}

					{categories && categories.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories
								.filter(c => c.isActive)
								.map(category => (
									<Link
										key={category.id}
										href={`/products?category=${category.slug}`}
										className="group relative rounded-2xl overflow-hidden border border-border bg-surface-subtle hover:border-brand-purple/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.10)] transition-all duration-300">
										<div className="relative aspect-[16/10] overflow-hidden bg-brand-navy">
											{category.coverImage ? (
												<img
													src={category.coverImage}
													alt={category.name}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-gradient-brand-soft">
													<span className="text-5xl" aria-hidden="true">
														{category.icon ?? "📁"}
													</span>
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
										</div>

										<div className="p-5">
											<h3 className="font-serif text-lg font-semibold text-brand-navy group-hover:text-brand-purple-dark transition-colors">
												{category.name}
											</h3>
											{category.description && (
												<p className="mt-1.5 text-[13px] text-text-secondary/60 font-light leading-relaxed line-clamp-2">
													{category.description}
												</p>
											)}
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
