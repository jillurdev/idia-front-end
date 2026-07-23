import { useMutation, useQueryClient } from "@tanstack/react-query";
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
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: async data => {
			queryClient.setQueryData(["auth-user"], data.user);
			await queryClient.invalidateQueries({ queryKey: ["auth-user"] });

			toast.success(`Welcome back, ${data.user.name}!`);

			const redirect = ROLE_REDIRECT[data.user.role] ?? "/dashboard";

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
