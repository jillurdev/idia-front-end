import { useQuery } from "@tanstack/react-query";
import { overviewApi } from "../api";

export const ownerOverviewQueryKey = ["owner", "overview"] as const;

export function useOwnerOverview() {
	return useQuery({
		queryKey: ownerOverviewQueryKey,
		queryFn: () => overviewApi.get(),
		select: res => res.data,
		staleTime: 60_000,
	});
}
