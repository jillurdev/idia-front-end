import type { UserRole } from "../types";

const ROLE_MAP: Record<UserRole, { label: string; className: string }> = {
	OWNER: {
		label: "Owner",
		className: "bg-brand-purple/10 text-brand-purple-dark",
	},
	ADMIN: {
		label: "Admin",
		className: "bg-brand-cyan/10 text-brand-cyan-dark",
	},
	USER: {
		label: "User",
		className: "bg-surface-muted text-text-muted",
	},
};

export function UserRoleBadge({ role }: { role: UserRole }) {
	const { label, className } = ROLE_MAP[role];
	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${className}`}>
			{label}
		</span>
	);
}
