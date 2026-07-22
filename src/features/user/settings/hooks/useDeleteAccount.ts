"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/services/httpClient";
import { settingsApi } from "../api";

export function useDeleteAccount() {
	const { logout } = useAuth();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: () => settingsApi.deleteAccount(),
		onSuccess: async () => {
			toast.success("Your account has been deleted");
			await logout();
			router.push("/");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof ApiError
					? err.message
					: err instanceof Error
						? err.message
						: "Failed to delete account";
			toast.error(message);
		},
	});

	return {
		deleteAccount: () => mutation.mutate(),
		isDeleting: mutation.isPending,
	};
}
