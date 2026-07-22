import { httpClient } from "@/services/httpClient";
import type { ChangePasswordPayload } from "./types";

export const settingsApi = {
	// PATCH /users/change-password — self-service, no role guard
	changePassword: (payload: ChangePasswordPayload) =>
		httpClient.patch<ApiResponse<null>>("/users/change-password", payload),

	// DELETE /users/me — self-service account deletion
	deleteAccount: () => httpClient.delete<ApiResponse<null>>("/users/me"),
};
