"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductsEmpty from "../components/products-empty";
import ProductCard from "../components/product-card";
import { ProductListItem } from "@/types/product";

export default function ProductsGrid({
	products,
	page,
	totalPages,
}: {
	products: ProductListItem[];
	page: number;
	totalPages: number;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const goToPage = (nextPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(nextPage));
		router.push(`/products?${params.toString()}`);
	};

	if (!products.length) return <ProductsEmpty />;

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-3">
					<button
						disabled={page <= 1}
						onClick={() => goToPage(page - 1)}
						className="px-4 h-11 rounded-xl border border-brand-parchment disabled:opacity-40">
						Prev
					</button>

					<div className="text-sm text-brand-black/70">
						Page {page} of {totalPages}
					</div>

					<button
						disabled={page >= totalPages}
						onClick={() => goToPage(page + 1)}
						className="px-4 h-11 rounded-xl border border-brand-parchment disabled:opacity-40">
						Next
					</button>
				</div>
			)}
		</div>
	);
}
