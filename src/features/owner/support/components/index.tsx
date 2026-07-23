"use client";

import { useState } from "react";
import { usePagination } from "@/hooks/common/usePagination";
import { PageSizeSelect } from "@/components/common/PageSizeSelect";
import { SearchInput } from "@/components/common/SearchInput";
import { Pagination } from "@/components/common/Pagination";
import { useAllTickets } from "../hooks/useAllTickets";
import { TicketsTable } from "./TicketsTable";
import type { TicketStatus } from "@/features/user/support/types";

const STATUS_OPTIONS: Array<TicketStatus | "ALL"> = [
	"ALL",
	"OPEN",
	"IN_PROGRESS",
	"RESOLVED",
	"CLOSED",
];

export default function OwnerSupportPage() {
	const { page, setPage, limit, setLimit, search, setSearch } = usePagination({
		initialLimit: 10,
	});
	const [status, setStatus] = useState<TicketStatus | "ALL">("ALL");

	const { data, isLoading, isError, isPlaceholderData } = useAllTickets({
		page,
		limit,
		status,
		...(search ? { search } : {}),
	});

	return (
		<div className="space-y-4">
			<div className="flex items-end justify-between">
				<div>
					<h1 className="text-xl font-semibold text-text-primary">
						Support Tickets
					</h1>
					<p className="text-sm text-text-muted">
						Messages from customers and guests
					</p>
				</div>
				<PageSizeSelect value={limit} onChange={setLimit} />
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search by subject, ticket #, or email…"
				/>
				<select
					value={status}
					onChange={e => {
						setStatus(e.target.value as TicketStatus | "ALL");
						setPage(1);
					}}
					className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-glow">
					{STATUS_OPTIONS.map(s => (
						<option key={s} value={s}>
							{s === "ALL" ? "All statuses" : s.replace("_", " ")}
						</option>
					))}
				</select>
			</div>

			{isLoading && (
				<div className="p-8 text-center text-sm text-text-muted">
					Loading tickets…
				</div>
			)}
			{isError && (
				<div className="p-8 text-center text-sm text-red-600">
					Failed to load tickets.
				</div>
			)}

			{data && (
				<div className={isPlaceholderData ? "opacity-60 transition-opacity" : ""}>
					<TicketsTable tickets={data.data} />
					{data.meta && <Pagination meta={data.meta} onPageChange={setPage} />}
				</div>
			)}
		</div>
	);
}
