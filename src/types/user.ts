import { AppRole } from "./roles";

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: AppRole;
	status: string;
	avatar: string | null;
	createdAt: string;
}
