import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../api";
import type { SettingGroup, SiteSetting } from "../types";

export const settingsQueryKey = ["owner", "settings"] as const;

export function useSettings() {
	return useQuery({
		queryKey: settingsQueryKey,
		queryFn: settingsApi.getAll,
		select: res => {
			console.log("🚀 ~ useSettings ~ res:", res)
			const byGroup: Record<SettingGroup, Record<string, string>> = {
				general: {},
				payment: {},
				email: {},
			};
			res.data.forEach((setting: SiteSetting) => {
				if (byGroup[setting.group as SettingGroup]) {
					byGroup[setting.group as SettingGroup][setting.key] = setting.value;
				}
			});
			return byGroup;
		},
	});
}