import { useMemo, useState } from "react";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export interface UsePaginationOptions {
	initialPage?: number;
	initialLimit?: PageSize;
}

/**
 * Generic pagination + search state, reusable across any list page
 * (logs, products, purchases, users, etc). Pairs with the server-side
 * `page` / `limit` / `search` query params.
 */
export function usePagination(options: UsePaginationOptions = {}) {
	const { initialPage = 1, initialLimit = 10 } = options;

	const [page, setPage] = useState(initialPage);
	const [limit, setLimitState] = useState<PageSize>(initialLimit);
	const [search, setSearchState] = useState("");

	// Changing page size or search should reset back to page 1,
	// otherwise you can land on an out-of-range page.
	const setLimit = (next: PageSize) => {
		setLimitState(next);
		setPage(1);
	};

	const setSearch = (next: string) => {
		setSearchState(next);
		setPage(1);
	};

	const queryParams = useMemo(
		() => ({ page, limit, ...(search ? { search } : {}) }),
		[page, limit, search],
	);

	return {
		page,
		setPage,
		limit,
		setLimit,
		search,
		setSearch,
		queryParams,
	};
}
