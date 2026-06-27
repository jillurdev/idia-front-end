import { http } from "@/services/http";
import { UserResponse } from "@/types/user";

export const usersApi = {
	 
	getById: (id: string) => http.get<UserResponse>(`/users/${id}`),

	updateProfile: (payload: { name: string; phone: string }) =>
		http.patch<UserResponse>("/users/profile", payload),

	changePassword: (payload: { currentPassword: string; newPassword: string }) =>
		http.patch("/users/change-password", payload),

	deleteAccount: () => http.delete("/users/me"),
};
