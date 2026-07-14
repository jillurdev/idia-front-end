import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api";
import type { UpdateProfilePayload } from "../types";
import { ApiError } from "@/services/httpClient";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) =>
			settingsApi.updateProfile(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
			toast.success("প্রোফাইল আপডেট হয়েছে");
		},
		onError: error => {
			const message =
				error instanceof ApiError ? error.message : "প্রোফাইল আপডেট করা যায়নি";
			toast.error(message);
		},
	});
}
