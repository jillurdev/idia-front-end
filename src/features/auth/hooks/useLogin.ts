import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { ApiError } from "@/services/httpClient";

const ROLE_REDIRECT: Record<string, string> = {
	OWNER: "/owner",
	ADMIN: "/admin",
	USER: "/dashboard",
};

export function useLogin() {
	const router = useRouter();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: data => {
			console.log("Login success", data);

			toast.success(`Welcome back, ${data.user.name}!`);

			const redirect = ROLE_REDIRECT[data.user.role] ?? "/dashboard";

			console.log("Redirecting to:", redirect);

			router.push(redirect);
		},
		onError: error => {
			if (error instanceof ApiError) {
				if (error.status === 401) {
					toast.error("Invalid email or password");
					return;
				}
				if (error.status === 403) {
					toast.error("Your account has been suspended");
					return;
				}
			}
			toast.error("Something went wrong. Please try again.");
		},
	});
}
