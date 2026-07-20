import { Suspense } from "react";
import ProfileClient from "@/features/user/profile";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
	return (
		<Suspense fallback={null}>
			<ProfileClient />
		</Suspense>
	);
}
