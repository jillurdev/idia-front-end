import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

export function useRegister() {
	const router = useRouter();

	return useMutation({
		mutationFn: authApi.register,
		onSuccess: (_, variables) => {
			toast.success("OTP sent! Please check your email.");
			router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
		},
		onError: error => {
			if (error instanceof ApiError) {
				if (error.status === 409) {
					toast.error("Email or phone already in use");
					return;
				}
			}
			toast.error("Something went wrong. Please try again.");
		},
	});
}
