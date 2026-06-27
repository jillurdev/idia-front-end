"use client";

import { useAuth } from "@/context/AuthContext";


export default function CustomerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <div className="p-10">Loading...</div>;
	}

	if (!user) {
		return <div className="p-10">Unauthorized</div>;
	}

	return <>{children}</>;
}
