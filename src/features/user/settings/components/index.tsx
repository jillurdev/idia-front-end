"use client";

import { useState } from "react";
import { Lock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PasswordSection from "./password-section";
import DangerZoneSection from "./danger-zone-section";

type SettingsTab = "password" | "danger";

interface TabConfig {
	id: SettingsTab;
	label: string;
	icon: React.ReactNode;
}

const TABS: TabConfig[] = [
	{ id: "password", label: "Password", icon: <Lock className="w-3.5 h-3.5" /> },
	{
		id: "danger",
		label: "Danger zone",
		icon: <AlertTriangle className="w-3.5 h-3.5" />,
	},
];

export default function SettingsClient() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState<SettingsTab>("password");

	if (isLoading) return <SettingsSkeleton />;
	if (!user) return null;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10">
			<div className="rounded-3xl border border-border bg-surface shadow-[0_20px_60px_rgba(15,10,30,0.06)] overflow-hidden">
				<div className="px-6 md:px-8 pt-8 pb-0">
					<h1 className="text-2xl font-semibold text-brand-navy">
						Account settings
					</h1>
					<p className="text-sm text-text-muted mt-1">
						Manage your security and account
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-0">
					<aside className="md:w-52 shrink-0 px-4 md:px-6 pt-6 pb-4 md:pb-8 md:border-r border-border">
						<nav className="flex md:flex-col gap-1.5 flex-wrap">
							{TABS.map(({ id, label, icon }) => {
								const isActive = activeTab === id;
								const isDanger = id === "danger";
								return (
									<button
										key={id}
										onClick={() => setActiveTab(id)}
										className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left w-full ${
											isDanger
												? isActive
													? "bg-red-50 text-red-600 border border-red-200"
													: "text-red-400 hover:bg-red-50 hover:text-red-500 border border-transparent"
												: isActive
													? "bg-brand-purple text-brand-white shadow-sm border border-brand-purple"
													: "text-text-secondary hover:bg-surface-subtle hover:text-brand-navy border border-transparent"
										}`}>
										<span
											className={
												isDanger && !isActive
													? "text-red-400"
													: isActive
														? "text-current"
														: "text-text-muted"
											}>
											{icon}
										</span>
										{label}
									</button>
								);
							})}
						</nav>
					</aside>

					<main className="flex-1 px-6 md:px-8 pt-4 md:pt-8 pb-8">
						<div className="rounded-2xl border border-border-subtle bg-surface-subtle/60 backdrop-blur-sm p-5 md:p-6 shadow-[0_8px_30px_rgba(15,10,30,0.04)]">
							{activeTab === "password" && <PasswordSection />}
							{activeTab === "danger" && <DangerZoneSection />}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

function SettingsSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
			<div className="rounded-3xl border border-border bg-surface overflow-hidden">
				<div className="px-8 pt-8 pb-6 space-y-2">
					<div className="h-7 w-48 bg-surface-subtle rounded-lg" />
					<div className="h-4 w-64 bg-surface-muted rounded" />
				</div>
				<div className="flex">
					<div className="w-52 px-6 py-4 space-y-2 border-r border-border">
						{Array(2)
							.fill(0)
							.map((_, i) => (
								<div key={i} className="h-9 rounded-xl bg-surface-muted" />
							))}
					</div>
					<div className="flex-1 px-8 py-8">
						<div className="rounded-2xl border border-border-subtle p-6 space-y-4">
							<div className="h-10 w-full rounded-lg bg-surface-subtle" />
							<div className="h-10 w-full rounded-lg bg-surface-subtle" />
							<div className="h-10 w-40 rounded-lg bg-surface-muted" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
