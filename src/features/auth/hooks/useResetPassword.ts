import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

export function useResetPassword() {
	const router = useRouter();

	return useMutation({
		mutationFn: authApi.resetPassword,
		onSuccess: () => {
			toast.success("Password reset! You can now sign in.");
			router.push("/login");
		},
		onError: error => {
			if (error instanceof ApiError && error.status === 400) {
				toast.error("Reset link is invalid or expired");
				return;
			}
			toast.error("Something went wrong. Please try again.");
		},
	});
}
