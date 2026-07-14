import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../api";
import type { SettingGroup, SiteSetting } from "../types";

export const settingsQueryKey = ["owner", "settings"] as const;

export function useSettings() {
	return useQuery({
		queryKey: settingsQueryKey,
		queryFn: settingsApi.getAll,
		select: data => {
			const byGroup: Record<SettingGroup, Record<string, string>> = {
				general: {},
				payment: {},
				email: {},
			};
			data.forEach((setting: SiteSetting) => {
				if (byGroup[setting.group]) {
					byGroup[setting.group][setting.key] = setting.value;
				}
			});
			return byGroup;
		},
	});
}
