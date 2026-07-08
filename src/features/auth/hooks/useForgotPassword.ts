import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

export function useForgotPassword() {
	return useMutation({
		mutationFn: authApi.forgotPassword,
		onSuccess: () => {
			toast.success("Reset link sent! Check your email.");
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 400) {
				toast.error("Invalid email address");
				return;
			}
			toast.error("Something went wrong. Please try again.");
		},
	});
}
