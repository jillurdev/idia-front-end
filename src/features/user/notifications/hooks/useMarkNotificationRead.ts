"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../api";

export function useMarkNotificationRead() {
	const queryClient = useQueryClient();

	const markRead = useMutation({
		mutationFn: (id: string) => notificationApi.markRead(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", "notifications"] });
		},
	});

	const markAllRead = useMutation({
		mutationFn: () => notificationApi.markAllRead(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", "notifications"] });
		},
	});

	return {
		markRead: (id: string) => markRead.mutate(id),
		markAllRead: () => markAllRead.mutate(),
	};
}
