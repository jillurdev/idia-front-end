"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import OwnerSidebar from "@/features/owner/components/OwnerSidebar";
import OwnerHeader from "@/features/owner/components/OwnerHeader";

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { user, isLoading, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isLoading) return;

		if (!isAuthenticated) {
			router.replace("/login");
			return;
		}

		if (user?.role !== "OWNER") {
			router.replace("/");
		}
	}, [isLoading, isAuthenticated, user, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-brand-navy">
				<div className="w-8 h-8 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
			</div>
		);
	}

	if (!isAuthenticated || user?.role !== "OWNER") {
		return null;
	}

	return (
		<div className="min-h-screen flex bg-surface-subtle">
			<OwnerSidebar />

			<div className="flex-1 flex flex-col min-w-0">
				<OwnerHeader user={user} />
				<main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
			</div>
		</div>
	);
}
