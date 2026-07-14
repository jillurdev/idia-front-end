import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserResponse } from "@/types/user";
import { AppRole } from "@/types/roles";

const API_BASE_URL = "http://localhost:5050/api/v1";

export async function getCurrentUser(): Promise<UserResponse> {
	const cookieStore = await cookies();
	const cookieHeader = cookieStore.toString();

	if (!cookieHeader) {
		redirect("/login");
	}

	let res: Response;
	try {
		console.log("Before fetch");

		res = await fetch(`${API_BASE_URL}/auth/me`, {
			headers: {
				Cookie: cookieHeader,
			},
			cache: "no-store",
		});
	} catch (error) {
		console.error("FETCH FAILED:", error);
		throw error;
	}

	if (!res.ok) {
		redirect("/login");
	}

	const { data: user } = (await res.json()) as { data: UserResponse };

	if (!user) {
		redirect("/login");
	}

	return user;
}

export async function requireRole(
	allowedRoles: AppRole | AppRole[],
): Promise<UserResponse> {
	const user = await getCurrentUser();

	const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

	if (!roles.includes(user.role)) {
		console.log("Unauthorized");
		redirect("/unauthorized");
	}

	return user;
}
