import { httpClient } from "@/services/httpClient";
import type {
	SiteSetting,
	UpsertSettingPayload,
	OwnerProfile,
	UpdateProfilePayload,
	ChangePasswordPayload,
} from "./types";

export const settingsApi = {
	getAll: () => httpClient.get<ApiResponse<SiteSetting[]>>("/owner/settings"),

	upsert: (payload: UpsertSettingPayload) =>
		httpClient.post<ApiResponse<SiteSetting>>("/owner/settings", payload),

	updateProfile: (payload: UpdateProfilePayload) =>
		httpClient.patch<ApiResponse<OwnerProfile>>("/users/profile", payload),

	changePassword: (payload: ChangePasswordPayload) =>
		httpClient.patch<ApiResponse<{ message: string }>>(
			"/users/change-password",
			payload,
		),
};
