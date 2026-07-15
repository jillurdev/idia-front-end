import { LogActionBadge } from "./LogActionBadge";
import type { SiteLog } from "../types";

export function LogsTable({ logs }: { logs: SiteLog[] }) {
	if (logs.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-text-muted">
				No logs found for the selected filters.
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-lg border border-border bg-surface">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border-subtle text-left text-text-muted">
						<th className="px-4 py-3 font-medium">Action</th>
						<th className="px-4 py-3 font-medium">Entity</th>
						<th className="px-4 py-3 font-medium">Actor</th>
						<th className="px-4 py-3 font-medium">Detail</th>
						<th className="px-4 py-3 font-medium">IP</th>
						<th className="px-4 py-3 font-medium">Time</th>
					</tr>
				</thead>
				<tbody>
					{logs.map(log => (
						<tr
							key={log.id}
							className="border-b border-border-subtle last:border-0 hover:bg-surface-subtle">
							<td className="px-4 py-3">
								<LogActionBadge action={log.action} />
							</td>
							<td className="px-4 py-3 text-text-primary">
								{log.entity}
								{log.entityId && (
									<span className="ml-1 text-xs text-text-muted">
										#{log.entityId.slice(0, 8)}
									</span>
								)}
							</td>
							<td className="px-4 py-3">
								<div className="text-text-primary">
									{log.actor?.name ?? "—"}
								</div>
								<div className="text-xs text-text-muted">
									{log.actor?.email}
								</div>
							</td>
							<td className="px-4 py-3 max-w-xs truncate text-text-secondary">
								{log.detail ?? "—"}
							</td>
							<td className="px-4 py-3 text-text-muted">
								{log.ipAddress ?? "—"}
							</td>
							<td className="px-4 py-3 text-text-muted">
								{new Date(log.createdAt).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
