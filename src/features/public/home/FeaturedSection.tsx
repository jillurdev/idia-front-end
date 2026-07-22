"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useCategories } from "@/features/public/categories/hooks/useCategories";

export default function CategoriesSection() {
	const { data: categories = [], isLoading } = useCategories();

	// Nothing to show and nothing loading — quietly skip the section
	// rather than render an empty grid on a brand-new store.
	if (!isLoading && categories.length === 0) return null;

	return (
		<section className="py-24 bg-brand-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Explore"
					title="Browse by Category"
					subtitle="Every asset meticulously organised — find exactly what your project needs."
				/>

				<div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{isLoading
						? Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="h-[104px] rounded-xl border border-border bg-surface-subtle animate-pulse"
								/>
							))
						: categories.map(cat => (
								<Link
									key={cat.id}
									href={`/products?category=${cat.slug}`}
									className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border hover:border-brand-purple/40 hover:shadow-[0_4px_20px_rgba(168,85,247,0.12)] transition-all duration-300 bg-brand-white hover:bg-brand-purple/3">
									{cat.icon ? (
										<span className="text-3xl transition-transform duration-300 group-hover:scale-110">
											{cat.icon}
										</span>
									) : (
										<Sparkles className="w-7 h-7 text-brand-purple/50 transition-transform duration-300 group-hover:scale-110" />
									)}
									<div className="text-center">
										<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
											{cat.name}
										</p>
									</div>
								</Link>
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
