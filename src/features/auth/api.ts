import { apiClient } from "@/services/apiClient";
import { LoginPayload } from "./types";
import { UserResponse } from "@/types/user";

export interface LoginResponse {
	user: Omit<UserResponse, "phone" | "createdAt">;
}

export const authApi = {
	login: async (payload: LoginPayload): Promise<LoginResponse> => {
		const res = await apiClient.post<{ data: LoginResponse }>(
			"/auth/login",
			payload,
		);
		return res.data;  
	},

	me: async (): Promise<UserResponse> => {
		const res = await apiClient.get<{ data: UserResponse }>("/auth/me");
		return res.data;  
	},

	logout: () => apiClient.post("/auth/logout", {}),
};