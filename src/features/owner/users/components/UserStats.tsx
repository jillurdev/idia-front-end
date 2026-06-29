import type { AdminUser } from "../types";

export function UserStats({ users }: { users: AdminUser[] }) {
	const total = users.length;
	const active = users.filter(u => u.status === "ACTIVE").length;
	const pending = users.filter(u => u.status === "PENDING").length;
	const banned = users.filter(
		u => u.status === "SUSPENDED" || u.status === "BANNED",
	).length;

	const stats = [
		{
			label: "Total Users",
			value: total,
			color: "text-brand-navy",
		},
		{
			label: "Active",
			value: active,
			color: "text-emerald-600",
		},
		{
			label: "Pending Verification",
			value: pending,
			color: "text-amber-600",
		},
		{
			label: "Suspended / Banned",
			value: banned,
			color: "text-red-500",
		},
	];

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
			{stats.map(stat => (
				<div
					key={stat.label}
					className="bg-surface rounded-xl border border-border px-5 py-4">
					<p className="text-[11px] uppercase tracking-wider text-text-muted font-medium mb-2">
						{stat.label}
					</p>
					<p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
				</div>
			))}
		</div>
	);
}
