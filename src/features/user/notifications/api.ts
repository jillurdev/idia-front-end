import { httpClient } from "@/services/httpClient";
import type { Notification } from "./types";

export const notificationApi = {
	getMine: () =>
		httpClient.get<ApiResponse<Notification[]>>("/notifications/me"),

	markRead: (id: string) =>
		httpClient.patch<ApiResponse<Notification>>(
			`/notifications/${id}/read`,
			{},
		),

	markAllRead: () =>
		httpClient.patch<ApiResponse<null>>("/notifications/read-all", {}),
};
