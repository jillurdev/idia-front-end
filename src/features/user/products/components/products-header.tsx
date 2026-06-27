"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductsHeader({ total }: { total: number }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("search") || "");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());

		if (search.trim()) params.set("search", search.trim());
		else params.delete("search");

		params.set("page", "1");
		router.push(`/products?${params.toString()}`);
	};

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
					Digital Products
				</h1>
				<p className="mt-2 text-brand-black/60 text-sm md:text-base">
					Explore premium templates, assets, and resources for your next
					project.
				</p>
			</div>

			<div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
				<form onSubmit={handleSearch} className="relative w-full md:max-w-md">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/40" />
					<input
						type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search products..."
						className="w-full h-12 pl-11 pr-4 rounded-xl border border-brand-parchment bg-white outline-none focus:ring-2 focus:ring-brand-gold/30 text-sm"
					/>
				</form>

				<p className="text-sm text-brand-black/60 whitespace-nowrap">
					{total} products found
				</p>
			</div>
		</div>
	);
}
