import { httpClient } from "@/services/httpClient";
import type {
	LoginPayload,
	LoginResponse,
	RegisterPayload,
	ResendOtpPayload,
	ResetPasswordPayload,
	VerifyEmailPayload,
} from "./types";
import type { UserResponse } from "@/types/user";

export const authApi = {
	login: async (payload: LoginPayload): Promise<LoginResponse> => {
		const res = await httpClient.post<{ data: LoginResponse }>(
			"/auth/login",
			payload,
		);
		return res.data;
	},

	register: async (payload: RegisterPayload): Promise<void> => {
		await httpClient.post("/users/register", payload);
	},
	verifyEmail: async (payload: VerifyEmailPayload): Promise<void> => {
		await httpClient.post("/users/verify-email", payload);
	},

	resendOtp: async (payload: ResendOtpPayload): Promise<void> => {
		await httpClient.post("/users/resend-otp", payload);
	},
	forgotPassword: async (payload: { email: string }): Promise<void> => {
		await httpClient.post("/auth/forgot-password", payload);
	},

	resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
		await httpClient.post("/auth/reset-password", payload);
	},
	me: async (): Promise<UserResponse> => {
		const res = await httpClient.get<{ data: UserResponse }>("/auth/me");
		return res.data;
	},

	logout: async (): Promise<void> => {
		await httpClient.post("/auth/logout", {});
	},
};
