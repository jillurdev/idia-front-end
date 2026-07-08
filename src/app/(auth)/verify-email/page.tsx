"use client";

import { Suspense } from "react";
import VerifyEmailPage from "@/features/auth/components/VerifyEmail";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") ?? "";

	return (
		<div>
			<VerifyEmailPage email={email} />
		</div>
	);
}

export default function Page() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center text-text-muted">
					Loading...
				</div>
			}>
			<VerifyEmailContent />
		</Suspense>
	);
}
