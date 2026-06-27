"use client";

import VerifyEmailPage from "@/features/auth/components/VerifyEmail";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") ?? "";
	return (
		<div>
			<VerifyEmailPage email={email} />
		</div>
	);
};

export default page;
