import { httpClient } from "@/services/httpClient";
import { UserResponse } from "@/types/user";

export const usersApi = {
	getById: (id: string) => httpClient.get<UserResponse>(`/users/${id}`),

	updateProfile: (payload: { name: string; phone: string }) =>
		httpClient.patch<UserResponse>("/users/profile", payload),

	changePassword: (payload: { currentPassword: string; newPassword: string }) =>
		httpClient.patch("/users/change-password", payload),

	deleteAccount: () => httpClient.delete("/users/me"),
};
