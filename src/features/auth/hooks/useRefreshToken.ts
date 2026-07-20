import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api";

export function useRefreshToken() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: authApi.refresh,
		onSuccess: data => {
			queryClient.setQueryData(["auth-user"], data.user);
		},
		onError: () => {
			queryClient.setQueryData(["auth-user"], null);
		},
	});
}
