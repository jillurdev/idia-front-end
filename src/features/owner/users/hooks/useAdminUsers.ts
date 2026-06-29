import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminUserApi } from "../api";

export const ADMIN_USERS_KEY = ["owner-users"];

export function useAdminUsers() {
	return useQuery({
		queryKey: ADMIN_USERS_KEY,
		queryFn: adminUserApi.getAll,
	});
}

export function useDeleteAdminUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => adminUserApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
			toast.success("User deleted");
		},
		onError: () => toast.error("Failed to delete user"),
	});
}
