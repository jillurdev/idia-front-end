import { http } from "@/services/http";
import type { LoginPayload, LoginResponse, RegisterPayload, ResendOtpPayload, ResetPasswordPayload, VerifyEmailPayload } from "./types";
import type { UserResponse } from "@/types/user";

export const authApi = {
	login: async (payload: LoginPayload): Promise<LoginResponse> => {
		const res = await http.post<{ data: LoginResponse }>(
			"/auth/login",
			payload,
		);
		return res.data;
	},

	register: async (payload: RegisterPayload): Promise<void> => {
		await http.post("/users/register", payload);
	},
	verifyEmail: async (payload: VerifyEmailPayload): Promise<void> => {
		await http.post("/users/verify-email", payload);
	},

	resendOtp: async (payload: ResendOtpPayload): Promise<void> => {
		await http.post("/users/resend-otp", payload);
	},
	forgotPassword: async (payload: { email: string }): Promise<void> => {
		await http.post("/auth/forgot-password", payload);
	},

	resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
		await http.post("/auth/reset-password", payload);
	},
	me: async (): Promise<UserResponse> => {
		const res = await http.get<{ data: UserResponse }>("/auth/me");
		return res.data;
	},

	logout: async (): Promise<void> => {
		await http.post("/auth/logout", {});
	},
};
