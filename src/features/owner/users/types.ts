export type UserRole = "USER" | "ADMIN" | "OWNER";
export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "BANNED";

export interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	avatar: string | null;
	createdAt: string;
}
