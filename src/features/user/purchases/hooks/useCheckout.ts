"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/services/httpClient";
import { useAuth } from "@/context/AuthContext";
import { purchasesApi } from "../api";

/**
 * Handles the full Buy Now / Buy Selected flow (single item or bulk):
 * - redirects to /login if not authenticated (with a `next` back-link)
 * - calls the checkout endpoint with an array of productIds
 * - redirects the browser to the LemonSqueezy checkout page on success
 * - surfaces "already own some of these" / "not available" errors
 */
export function useCheckout() {
	const { user } = useAuth();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: (productIds: string[]) => purchasesApi.checkout(productIds),
		onSuccess: res => {
			window.location.href = res.data.checkoutUrl;
		},
		onError: (err: unknown) => {
			if (err instanceof ApiError && err.status === 409) {
				toast.error(err.message || "You already own one of these products.");
				return;
			}
			const message =
				err instanceof Error ? err.message : "Could not start checkout";
			toast.error(message);
		},
	});

	const buyNow = (productIds: string[], currentPath: string) => {
		if (productIds.length === 0) return;
		if (!user) {
			router.push(`/login?next=${encodeURIComponent(currentPath)}`);
			return;
		}
		mutation.mutate(productIds);
	};

	return { buyNow, isPending: mutation.isPending };
}
