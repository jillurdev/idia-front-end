"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useAdminUsers } from "@/features/owner/users/hooks/useAdminUsers";
import { UserTable } from "@/features/owner/users/components/UserTable";
import { UserStats } from "@/features/owner/users/components/UserStats";

export default function Users() {
	const { data: users = [], isLoading } = useAdminUsers();
	const [search, setSearch] = useState("");

	const filtered = users.filter(
		u =>
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="font-serif text-2xl font-semibold text-brand-navy">
					Users
				</h1>
				<p className="text-sm text-text-muted mt-0.5">
					{users.length} total users
				</p>
			</div>

			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<>
					<UserStats users={users} />

					{/* Search */}
					<div className="relative max-w-sm">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
						<input
							type="text"
							placeholder="Search by name or email…"
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all"
						/>
					</div>

					{/* Table */}
					<UserTable users={filtered} />
				</>
			)}
		</div>
	);
}
