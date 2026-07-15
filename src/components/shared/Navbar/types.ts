import type { AppRole } from "@/types/roles";

export interface NavUser {
	name: string;
	email: string;
	avatar?: string | null;
	role: AppRole;
}
