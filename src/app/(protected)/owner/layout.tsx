"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import OwnerSidebar from "@/features/owner/components/OwnerSidebar";
import OwnerHeader from "@/features/owner/components/OwnerHeader";
import { redirect } from "next/navigation";

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-surface-subtle flex items-center justify-center">
				<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
			</div>
		);
	}

	if (!user || user.role !== "OWNER") {
		redirect("/login");
	}

	return (
		<div className="flex min-h-screen bg-surface-subtle">
			<OwnerSidebar
				mobileOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
			/>
			<div className="flex-1 flex flex-col min-w-0">
				<OwnerHeader user={user} onMenuClick={() => setMobileOpen(v => !v)} />
				<main className="flex-1 p-6 lg:p-8">{children}</main>
			</div>
		</div>
	);
}
