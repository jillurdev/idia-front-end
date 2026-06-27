"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductsHeader from "./products-header";
import ProductsFilters from "./products-filters";
import { ProductsResponse } from "@/types/product";
import { productsApi } from "@/lib/api/products.api";
import ProductsGrid from "./products-grid";

export default function ProductsPageClient() {
	const searchParams = useSearchParams();

	const params = {
		search: searchParams.get("search") || "",
		category: searchParams.get("category") || "",
		tag: searchParams.get("tag") || "",
		sort: searchParams.get("sort") || "latest",
		page: Number(searchParams.get("page") || 1),
		limit: 12,
	};

	const { data, isLoading, isError } = useQuery<ProductsResponse>({
		queryKey: ["products", params],
		queryFn: () => productsApi.getProducts(params),
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Something went wrong.</div>;

	return (
		<div className="min-h-screen bg-brand-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<ProductsHeader total={data.total} />

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
					<ProductsFilters categories={data.categories} tags={data.tags} />

					<ProductsGrid
						products={data.products}
						page={data.page}
						totalPages={data.totalPages}
					/>
				</div>
			</div>
		</div>
	);
}
