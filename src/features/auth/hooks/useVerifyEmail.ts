import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

export function useVerifyEmail() {
	const router = useRouter();

	return useMutation({
		mutationFn: authApi.verifyEmail,
		onSuccess: () => {
			toast.success("Email verified! You can now sign in.");
			router.push("/login");
		},
		onError: error => {
			if (error instanceof ApiError) {
				if (error.status === 400) {
					toast.error("Invalid or expired OTP");
					return;
				}
				if (error.status === 409) {
					toast.error("Email already verified");
					router.push("/login");
					return;
				}
			}
			toast.error("Something went wrong.");
		},
	});
}
