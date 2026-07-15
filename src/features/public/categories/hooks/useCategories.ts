import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api";

export function useCategories() {
	return useQuery({
		queryKey: ["public", "categories"],
		queryFn: () => categoriesApi.getAll(),
		select: res => res.data,
		staleTime: 5 * 60_000, // categories change rarely
	});
}
