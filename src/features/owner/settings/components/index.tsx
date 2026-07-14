import SettingsTabs from "@/features/owner/settings/components/SettingsTabs";
import { requireRole } from "@/lib/auth/server";

export default async function OwnerSettings() {
	const currentUser = await requireRole("OWNER");

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-text-primary">সেটিংস</h1>
				<p className="mt-1 text-sm text-text-muted">
					সাইট, পেমেন্ট, ইমেইল ও প্রোফাইল কনফিগারেশন পরিচালনা করুন
				</p>
			</div>
			<SettingsTabs currentUser={currentUser} />
		</div>
	);
}
