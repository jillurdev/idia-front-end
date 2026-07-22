"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/services/httpClient";
import { settingsApi } from "../api";
import type { ChangePasswordPayload } from "../types";

export function useChangePassword() {
	const mutation = useMutation({
		mutationFn: (payload: ChangePasswordPayload) =>
			settingsApi.changePassword(payload),
		onSuccess: () => {
			toast.success("Password changed successfully");
		},
		onError: (err: unknown) => {
			const message =
				err instanceof ApiError
					? err.message
					: err instanceof Error
						? err.message
						: "Failed to change password";
			toast.error(message);
		},
	});

	return {
		changePassword: (payload: ChangePasswordPayload) =>
			mutation.mutateAsync(payload),
		isChanging: mutation.isPending,
	};
}
