"use client";

import { useState } from "react";
import { Lock, Bell, Shield, AlertTriangle, UserCog } from "lucide-react";
import PasswordSection from "../sections/password-section";
import NotificationPrefsSection from "../sections/notification-prefs-section";
import PrivacySection from "../sections/privacy-section";
import DangerZoneSection from "../sections/danger-zone-section";
import AdminManageSection from "../sections/admin-manage-section";
import { useAuth } from "@/context/AuthContext";

type SettingsTab =
	| "password"
	| "notifications"
	| "privacy"
	| "danger"
	| "admins";

interface TabConfig {
	id: SettingsTab;
	label: string;
	icon: React.ReactNode;
	roles?: string[]; // undefined = all roles
}

export default function SettingsClient() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState<SettingsTab>("password");

	if (isLoading) return <SettingsSkeleton />;
	if (!user) return null;

	const TABS: TabConfig[] = [
		{
			id: "password",
			label: "Password",
			icon: <Lock className="w-3.5 h-3.5" />,
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: <Bell className="w-3.5 h-3.5" />,
		},
		{
			id: "privacy",
			label: "Privacy",
			icon: <Shield className="w-3.5 h-3.5" />,
		},
		{
			id: "admins",
			label: "Manage admins",
			icon: <UserCog className="w-3.5 h-3.5" />,
			roles: ["OWNER"],
		},
		{
			id: "danger",
			label: "Danger zone",
			icon: <AlertTriangle className="w-3.5 h-3.5" />,
		},
	];

	const visibleTabs = TABS.filter(t => !t.roles || t.roles.includes(user.role));

	return (
		<div className="max-w-4xl mx-auto px-4 py-10">
			<div className="rounded-3xl border border-[#e4d8c4] bg-gradient-to-br from-[#fffdf9] via-[#f9f5ee] to-[#f3ecdf] shadow-[0_20px_60px_rgba(13,13,13,0.06)] overflow-hidden">
				{/* Header */}
				<div className="px-6 md:px-8 pt-8 pb-0">
					<h1 className="text-2xl font-semibold text-[#0d0d0d]">
						Account settings
					</h1>
					<p className="text-sm text-[#9c8e7e] mt-1">
						Manage your security and preferences
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-0">
					{/* Sidebar tabs */}
					<aside className="md:w-52 shrink-0 px-4 md:px-6 pt-6 pb-4 md:pb-8 md:border-r border-[#e4d8c4]">
						<nav className="flex md:flex-col gap-1.5 flex-wrap">
							{visibleTabs.map(({ id, label, icon }) => {
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
													? "bg-[#c8a96e] text-[#0d0d0d] shadow-sm border border-[#c8a96e]"
													: "text-[#5c5244] hover:bg-[#f5f0e8] hover:text-[#0d0d0d] border border-transparent"
										}`}>
										<span
											className={
												isDanger && !isActive
													? "text-red-400"
													: isActive && !isDanger
														? "text-[#0d0d0d]"
														: "text-[#9c8e7e]"
											}>
											{icon}
										</span>
										{label}
									</button>
								);
							})}
						</nav>
					</aside>

					{/* Content */}
					<main className="flex-1 px-6 md:px-8 pt-4 md:pt-8 pb-8">
						<div className="rounded-2xl border border-[#eadfce] bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-[0_8px_30px_rgba(13,13,13,0.04)]">
							{activeTab === "password" && <PasswordSection />}
							{activeTab === "notifications" && <NotificationPrefsSection />}
							{activeTab === "privacy" && <PrivacySection />}
							{activeTab === "admins" && <AdminManageSection />}
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
			<div className="rounded-3xl border border-[#e4d8c4] bg-[#fffdf9] overflow-hidden">
				<div className="px-8 pt-8 pb-6 space-y-2">
					<div className="h-7 w-48 bg-[#e8e0d0] rounded-lg" />
					<div className="h-4 w-64 bg-[#f0e7d8] rounded" />
				</div>
				<div className="flex">
					<div className="w-52 px-6 py-4 space-y-2 border-r border-[#e4d8c4]">
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<div key={i} className="h-9 rounded-xl bg-[#f0e7d8]" />
							))}
					</div>
					<div className="flex-1 px-8 py-8">
						<div className="rounded-2xl border border-[#eadfce] p-6 space-y-4">
							<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
							<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
							<div className="h-10 w-40 rounded-lg bg-[#f0e7d8]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
