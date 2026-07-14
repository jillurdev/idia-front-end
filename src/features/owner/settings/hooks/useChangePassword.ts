import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api";
import type { ChangePasswordPayload } from "../types";
import { ApiError } from "@/services/httpClient";

export function useChangePassword() {
	return useMutation({
		mutationFn: (payload: ChangePasswordPayload) =>
			settingsApi.changePassword(payload),
		onSuccess: () => {
			toast.success("পাসওয়ার্ড পরিবর্তন হয়েছে");
		},
		onError: error => {
			const message =
				error instanceof ApiError
					? error.message
					: "পাসওয়ার্ড পরিবর্তন করা যায়নি";
			toast.error(message);
		},
	});
}
