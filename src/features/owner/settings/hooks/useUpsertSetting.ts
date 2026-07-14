import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api";
import { settingsQueryKey } from "./useSettings";
import type { UpsertSettingPayload } from "../types";
import { ApiError } from "@/services/httpClient";

export function useUpsertSetting() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpsertSettingPayload) => settingsApi.upsert(payload),
		onError: error => {
			const message =
				error instanceof ApiError ? error.message : "সেটিং সেভ করা যায়নি";
			toast.error(message);
		},
	});
}

export function useUpsertSettingsBatch() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payloads: UpsertSettingPayload[]) => {
			// Sequential upserts since backend exposes single-key upsert only
			const results = [];
			for (const payload of payloads) {
				results.push(await settingsApi.upsert(payload));
			}
			return results;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: settingsQueryKey });
			toast.success("সেটিংস আপডেট হয়েছে");
		},
		onError: error => {
			const message =
				error instanceof ApiError ? error.message : "সেটিংস সেভ করা যায়নি";
			toast.error(message);
		},
	});
}
