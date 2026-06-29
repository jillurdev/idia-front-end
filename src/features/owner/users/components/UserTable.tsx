"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserRoleBadge } from "./UserRoleBadge";
import { useDeleteAdminUser } from "../hooks/useAdminUsers";
import { useAuth } from "@/context/AuthContext";
import type { AdminUser } from "../types";

interface UserTableProps {
	users: AdminUser[];
}

export function UserTable({ users }: UserTableProps) {
	const { user: currentUser } = useAuth();
	const { mutate: deleteUser } = useDeleteAdminUser();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = (user: AdminUser) => {
		if (user.id === currentUser?.id) {
			alert("You cannot delete your own account from here.");
			return;
		}
		if (!confirm(`Delete "${user.name}"? This cannot be undone.`)) return;
		setDeletingId(user.id);
		deleteUser(user.id, { onSettled: () => setDeletingId(null) });
	};

	if (users.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No users found.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle">
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							User
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Role
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Status
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Joined
						</th>
						<th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border bg-surface">
					{users.map(user => (
						<tr
							key={user.id}
							className={`hover:bg-surface-subtle transition-colors ${
								user.id === currentUser?.id ? "bg-brand-purple/5" : ""
							}`}>
							{/* User */}
							<td className="px-4 py-3">
								<div className="flex items-center gap-3">
									{/* Avatar */}
									<div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0 overflow-hidden">
										{user.avatar ? (
											<img
												src={user.avatar}
												alt={user.name}
												className="w-full h-full object-cover"
											/>
										) : (
											user.name.charAt(0).toUpperCase()
										)}
									</div>
									<div>
										<div className="flex items-center gap-1.5">
											<p className="font-medium text-text-primary text-[13px]">
												{user.name}
											</p>
											{user.id === currentUser?.id && (
												<span className="text-[10px] text-brand-purple font-medium">
													(you)
												</span>
											)}
										</div>
										<p className="text-[11px] text-text-muted">{user.email}</p>
									</div>
								</div>
							</td>

							{/* Role */}
							<td className="px-4 py-3">
								<UserRoleBadge role={user.role} />
							</td>

							{/* Status */}
							<td className="px-4 py-3">
								<UserStatusBadge status={user.status} />
							</td>

							{/* Joined */}
							<td className="px-4 py-3 hidden lg:table-cell">
								<span className="text-[12px] text-text-muted">
									{new Date(user.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</td>

							{/* Actions */}
							<td className="px-4 py-3">
								<div className="flex items-center justify-end">
									<button
										onClick={() => handleDelete(user)}
										disabled={
											deletingId === user.id ||
											user.id === currentUser?.id ||
											user.role === "OWNER"
										}
										className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
										title={
											user.role === "OWNER"
												? "Cannot delete owner"
												: user.id === currentUser?.id
													? "Cannot delete yourself"
													: "Delete user"
										}>
										<Trash2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
