import type { UserResponse } from "@/types/user";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: Omit<UserResponse, "phone" | "createdAt">;
}

export interface VerifyEmailPayload {
	email: string;
	otp: string;
}

export interface ResendOtpPayload {
	email: string;
}

export interface ResetPasswordPayload {
	token: string;
	newPassword: string;
}
export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
	phone?: string;
}
