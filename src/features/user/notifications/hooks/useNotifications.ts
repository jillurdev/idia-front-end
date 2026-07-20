"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { notificationApi } from "../api";

export function useNotifications() {
	const { user } = useAuth();

	const query = useQuery({
		queryKey: ["user", "notifications"],
		queryFn: () => notificationApi.getMine(),
		select: res => res.data,
		enabled: !!user,
		staleTime: 15_000,
		// Light polling so the bell badge stays fresh without a websocket.
		refetchInterval: 60_000,
	});

	const notifications = query.data ?? [];
	const unreadCount = notifications.filter(n => !n.isRead).length;

	return { ...query, notifications, unreadCount };
}
