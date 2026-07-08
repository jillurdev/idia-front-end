import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

export function useResendOtp() {
	return useMutation({
		mutationFn: authApi.resendOtp,
		onSuccess: () => {
			toast.success("OTP resent! Check your email.");
		},
		onError: error => {
			if (error instanceof ApiError) {
				if (error.status === 400) {
					toast.error("Please wait before requesting a new OTP");
					return;
				}
				if (error.status === 409) {
					toast.error("Email already verified");
					return;
				}
			}
			toast.error("Something went wrong.");
		},
	});
}
