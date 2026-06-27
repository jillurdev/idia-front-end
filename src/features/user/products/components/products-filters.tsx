"use client";

import { CategoryOption, TagOption } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsFilters({
	categories,
	tags,
}: {
	categories: CategoryOption[];
	tags: TagOption[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (!value) params.delete(key);
		else params.set(key, value);

		params.set("page", "1");
		router.push(`/products?${params.toString()}`);
	};

	return (
		<aside className="bg-white rounded-2xl border border-brand-parchment p-5 h-fit sticky top-24">
			<div className="space-y-6">
				<div>
					<h3 className="text-sm font-semibold text-brand-navy mb-3">
						Sort By
					</h3>
					<select
						defaultValue={searchParams.get("sort") || "latest"}
						onChange={e => updateFilter("sort", e.target.value)}
						className="w-full h-11 rounded-xl border border-brand-parchment px-3 text-sm outline-none focus:ring-2 focus:ring-brand-gold/30">
						<option value="latest">Latest</option>
						<option value="featured">Featured</option>
						<option value="popular">Most Popular</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
					</select>
				</div>

				<div>
					<h3 className="text-sm font-semibold text-brand-navy mb-3">
						Category
					</h3>
					<select
						defaultValue={searchParams.get("category") || ""}
						onChange={e => updateFilter("category", e.target.value)}
						className="w-full h-11 rounded-xl border border-brand-parchment px-3 text-sm outline-none focus:ring-2 focus:ring-brand-gold/30">
						<option value="">All Categories</option>
						{categories.map(cat => (
							<option key={cat.id} value={cat.slug}>
								{cat.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<h3 className="text-sm font-semibold text-brand-navy mb-3">Tags</h3>
					<div className="flex flex-wrap gap-2">
						{tags.map(tag => {
							const active = searchParams.get("tag") === tag.slug;
							return (
								<button
									key={tag.id}
									onClick={() => updateFilter("tag", active ? "" : tag.slug)}
									className={`px-3 py-1.5 rounded-full text-xs border transition ${
										active
											? "bg-brand-gold text-brand-black border-brand-gold"
											: "bg-brand-white text-brand-black/70 border-brand-parchment hover:bg-brand-parchment/40"
									}`}>
									{tag.name}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</aside>
	);
}
