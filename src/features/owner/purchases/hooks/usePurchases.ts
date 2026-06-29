import { useQuery } from "@tanstack/react-query";
import { purchaseApi } from "../api";

export const PURCHASES_KEY = ["owner-purchases"];

export function usePurchases() {
	return useQuery({
		queryKey: PURCHASES_KEY,
		queryFn: purchaseApi.getAll,
	});
}
