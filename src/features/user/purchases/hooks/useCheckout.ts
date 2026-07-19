"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/services/httpClient";
import { useAuth } from "@/context/AuthContext";
import { purchasesApi } from "../api";

/**
 * Handles the full Buy Now flow:
 * - redirects to /login if not authenticated (with a `next` back-link)
 * - calls the checkout endpoint
 * - redirects the browser to the LemonSqueezy checkout page on success
 * - surfaces "already purchased" / "not available" errors from the backend
 */
export function useCheckout() {
	const { user } = useAuth();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: (productId: string) => purchasesApi.checkout(productId),
		onSuccess: res => {
			window.location.href = res.data.checkoutUrl;
		},
		onError: (err: unknown) => {
			if (err instanceof ApiError && err.status === 409) {
				toast.error("You already own this product.");
				return;
			}
			const message =
				err instanceof Error ? err.message : "Could not start checkout";
			toast.error(message);
		},
	});

	const buyNow = (productId: string, currentPath: string) => {
		if (!user) {
			router.push(`/login?next=${encodeURIComponent(currentPath)}`);
			return;
		}
		mutation.mutate(productId);
	};

	return { buyNow, isPending: mutation.isPending };
}
