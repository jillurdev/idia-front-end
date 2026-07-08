"use client";

import { Suspense } from "react";
import ResetPassword from "@/features/auth/components/ResetPassword";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") ?? "";

	return (
		<div>
			<ResetPassword token={token} />
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
			<ResetPasswordContent />
		</Suspense>
	);
}
