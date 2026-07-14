"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSettings } from "../hooks/useSettings";
import GeneralSettingsForm from "./GeneralSettingsForm";
import PaymentSettingsForm from "./PaymentSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ProfileSecurityForm from "./ProfileSecurityForm";
import type { OwnerProfile } from "../types";

type TabKey = "general" | "payment" | "email" | "profile";

const TABS: { key: TabKey; label: string }[] = [
	{ key: "general", label: "সাধারণ" },
	{ key: "payment", label: "পেমেন্ট" },
	{ key: "email", label: "ইমেইল" },
	{ key: "profile", label: "প্রোফাইল ও সিকিউরিটি" },
];

interface Props {
	currentUser: OwnerProfile;
}

export default function SettingsTabs({ currentUser }: Props) {
	const [activeTab, setActiveTab] = useState<TabKey>("general");
	const { data, isLoading, isError } = useSettings();

	return (
		<div className="rounded-2xl border border-border bg-surface">
			<div className="flex gap-1 overflow-x-auto border-b border-border-subtle px-4 pt-3">
				{TABS.map(tab => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={cn(
							"shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition",
							activeTab === tab.key
								? "border-b-2 border-accent text-accent"
								: "text-text-muted hover:text-text-secondary",
						)}>
						{tab.label}
					</button>
				))}
			</div>

			<div className="p-6">
				{activeTab !== "profile" && isLoading && (
					<p className="text-sm text-text-muted">লোড হচ্ছে...</p>
				)}
				{activeTab !== "profile" && isError && (
					<p className="text-sm text-red-500">সেটিংস লোড করা যায়নি</p>
				)}

				{activeTab === "general" && data && (
					<GeneralSettingsForm values={data.general} />
				)}
				{activeTab === "payment" && data && (
					<PaymentSettingsForm values={data.payment} />
				)}
				{activeTab === "email" && data && (
					<EmailSettingsForm values={data.email} />
				)}
				{activeTab === "profile" && (
					<ProfileSecurityForm profile={currentUser} />
				)}
			</div>
		</div>
	);
}
