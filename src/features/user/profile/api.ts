import { httpClient } from "@/services/httpClient";
import type { UserResponse } from "@/types/user";
import type { UpdateProfilePayload } from "./types";

export const profileApi = {
	// PATCH /users/profile — self-service, no role guard
	update: (payload: UpdateProfilePayload) =>
		httpClient.patch<ApiResponse<UserResponse>>("/users/profile", payload),
};
