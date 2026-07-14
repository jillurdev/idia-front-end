import { httpClient } from "@/services/httpClient";
import type {
	SiteSetting,
	UpsertSettingPayload,
	OwnerProfile,
	UpdateProfilePayload,
	ChangePasswordPayload,
} from "./types";

export const settingsApi = {
	getAll: () => httpClient.get<SiteSetting[]>("/owner/settings"),

	upsert: (payload: UpsertSettingPayload) =>
		httpClient.post<SiteSetting>("/owner/settings", payload),

	updateProfile: (payload: UpdateProfilePayload) =>
		httpClient.patch<OwnerProfile>("/users/profile", payload),

	changePassword: (payload: ChangePasswordPayload) =>
		httpClient.patch<{ message: string }>("/users/change-password", payload),
};
