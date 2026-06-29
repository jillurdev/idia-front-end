import type { UserStatus } from "../types";

const STATUS_MAP: Record<UserStatus, { label: string; className: string }> = {
	ACTIVE: { label: "Active", className: "bg-emerald-50 text-emerald-600" },
	PENDING: { label: "Pending", className: "bg-amber-50 text-amber-600" },
	SUSPENDED: { label: "Suspended", className: "bg-orange-50 text-orange-600" },
	BANNED: { label: "Banned", className: "bg-red-50 text-red-500" },
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
	const { label, className } = STATUS_MAP[status];
	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${className}`}>
			{label}
		</span>
	);
}
