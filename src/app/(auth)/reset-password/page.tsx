"use client";
import ResetPassword from "@/features/auth/components/ResetPassword";
import { useSearchParams } from "next/navigation";

const page = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") ?? "";
	return (
		<div>
			<ResetPassword token={token} />
		</div>
	);
};

export default page;
