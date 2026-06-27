"use client";

import { useState } from "react";
import AvatarSection from "./sections/avatar-section";
import PersonalInfoSection from "./sections/personal-info-section";
import ActivitySnapshot from "./sections/activity-snapshot";
import MyReviewsSection from "./sections/my-reviews-section";
import { useAuth } from "@/context/AuthContext";

type ProfileTab = "info" | "activity" | "reviews";

const TABS: { id: ProfileTab; label: string }[] = [
	{ id: "info", label: "Personal Info" },
	{ id: "activity", label: "Activity" },
	{ id: "reviews", label: "My Reviews" },
];

export default function ProfileClient() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState<ProfileTab>("info");

	if (isLoading) return <ProfileSkeleton />;
	if (!user) return null;

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
			<div className="rounded-3xl border border-[#e4d8c4] bg-gradient-to-br from-[#fffdf9] via-[#f9f5ee] to-[#f3ecdf] shadow-[0_20px_60px_rgba(13,13,13,0.06)] overflow-hidden">
				{/* Cover banner */}
				<div className="h-28 bg-gradient-to-r from-[#0d0d0d] via-[#1a1a2e] to-[#7c6a4a] relative">
					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage: `radial-gradient(circle at 20% 50%, #c8a96e 0%, transparent 50%),
								radial-gradient(circle at 80% 20%, #7c6a4a 0%, transparent 40%)`,
						}}
					/>
				</div>

				<div className="px-6 md:px-8 pb-8 -mt-12 space-y-6">
					{/* Avatar + name */}
					<AvatarSection user={user} />

					{/* Tabs */}
					<div className="flex flex-wrap gap-2 border-b border-[#e4d8c4] pb-4">
						{TABS.map(({ id, label }) => {
							const isActive = activeTab === id;
							return (
								<button
									key={id}
									onClick={() => setActiveTab(id)}
									className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
										isActive
											? "bg-[#c8a96e] text-[#0d0d0d] border-[#c8a96e] shadow-md"
											: "bg-white/70 text-[#5c5244] border-[#e4d8c4] hover:bg-[#f5f0e8] hover:text-[#0d0d0d]"
									}`}>
									{label}
								</button>
							);
						})}
					</div>

					{/* Tab content */}
					<div className="rounded-2xl border border-[#eadfce] bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-[0_8px_30px_rgba(13,13,13,0.04)]">
						{activeTab === "info" && <PersonalInfoSection user={user} />}
						{activeTab === "activity" && <ActivitySnapshot user={user} />}
						{activeTab === "reviews" && <MyReviewsSection />}
					</div>
				</div>
			</div>
		</div>
	);
}

function ProfileSkeleton() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-10">
			<div className="rounded-3xl border border-[#e4d8c4] bg-[#fffdf9] overflow-hidden animate-pulse">
				<div className="h-28 bg-[#e8e0d0]" />
				<div className="px-6 md:px-8 pb-8 -mt-12 space-y-6">
					<div className="flex items-end gap-4">
						<div className="w-24 h-24 rounded-full bg-[#e8e0d0] border-4 border-white" />
						<div className="space-y-2 pb-1">
							<div className="h-5 w-44 bg-[#e8e0d0] rounded" />
							<div className="h-4 w-28 bg-[#f0e7d8] rounded" />
						</div>
					</div>
					<div className="flex gap-2">
						{[100, 80, 96].map((w, i) => (
							<div
								key={i}
								className={`h-9 w-${w === 100 ? "24" : w === 80 ? "20" : "24"} rounded-full bg-[#f0e7d8]`}
							/>
						))}
					</div>
					<div className="rounded-2xl border border-[#eadfce] bg-white p-6 space-y-4">
						<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
						<div className="h-10 w-full rounded-lg bg-[#f5f0e8]" />
						<div className="h-10 w-40 rounded-lg bg-[#f0e7d8]" />
					</div>
				</div>
			</div>
		</div>
	);
}
