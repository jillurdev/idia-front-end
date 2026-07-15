"use client";

import { useState } from "react";
import { usePagination } from "@/hooks/common/usePagination";
import { PageSizeSelect } from "@/components/common/PageSizeSelect";
import { Pagination } from "@/components/common/Pagination";
import { useSiteLogs } from "@/features/owner/logs/hooks/useSiteLogs";
import { LogFilters } from "@/features/owner/logs/components/LogFilters";
import { LogsTable } from "@/features/owner/logs/components/LogsTable";
import type { LogAction, SiteLogFilters } from "@/features/owner/logs/types";

export default function OwnerLogsPage() {
	const { page, setPage, limit, setLimit, search, setSearch } = usePagination({
		initialLimit: 20,
	});

	const [entity, setEntity] = useState("");
	const [action, setAction] = useState<LogAction | "ALL">("ALL");

	const filters: SiteLogFilters = {
		page,
		limit,
		...(search ? { search } : {}),
		...(entity ? { entity } : {}),
		...(action !== "ALL" ? { action } : {}),
	};

	const { data, isLoading, isError, isPlaceholderData } = useSiteLogs(filters);

	return (
		<div className="space-y-4">
			<div className="flex items-end justify-between">
				<div>
					<h1 className="text-xl font-semibold text-text-primary">
						Activity Logs
					</h1>
					<p className="text-sm text-text-muted">
						Recent actions across the platform
					</p>
				</div>
				<PageSizeSelect value={limit} onChange={setLimit} />
			</div>

			<LogFilters
				entity={entity}
				onEntityChange={v => {
					setEntity(v);
					setPage(1);
				}}
				action={action}
				onActionChange={v => {
					setAction(v);
					setPage(1);
				}}
				search={search}
				onSearchChange={setSearch}
				onClear={() => {
					setEntity("");
					setAction("ALL");
					setSearch("");
					setPage(1);
				}}
			/>

			{isLoading && (
				<div className="p-8 text-center text-sm text-text-muted">
					Loading logs…
				</div>
			)}
			{isError && (
				<div className="p-8 text-center text-sm text-red-600">
					Failed to load logs.
				</div>
			)}

			{data && (
				<div
					className={isPlaceholderData ? "opacity-60 transition-opacity" : ""}>
					<LogsTable logs={data.logs} />
					{data.meta && <Pagination meta={data.meta} onPageChange={setPage} />}
				</div>
			)}
		</div>
	);
}
