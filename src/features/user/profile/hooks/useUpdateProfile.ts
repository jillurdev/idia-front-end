"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "../api";
import type { UpdateProfilePayload } from "../types";

export function useUpdateProfile() {
	const { refetch } = useAuth();

	const mutation = useMutation({
		mutationFn: (payload: UpdateProfilePayload) => profileApi.update(payload),
		onSuccess: async () => {
			await refetch();
			toast.success("Profile updated!");
		},
		onError: (err: unknown) => {
			toast.error(err instanceof Error ? err.message : "Failed to update");
		},
	});

	return {
		updateProfile: (payload: UpdateProfilePayload) => mutation.mutate(payload),
		isUpdating: mutation.isPending,
	};
}
