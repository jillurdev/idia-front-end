"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function CustomerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
			</div>
		);
	}

	if (!user) {
		redirect("/login");
	}

	return (
		<div>
			<Navbar />
			<main className="min-h-screen">{children}</main>
			<Footer />
		</div>
	);
}
