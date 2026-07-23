import Link from "next/link";
import { TicketStatusBadge } from "@/features/user/support/components/TicketStatusBadge";
import type { TicketWithUser } from "@/features/user/support/types";

export function TicketsTable({ tickets }: { tickets: TicketWithUser[] }) {
	if (tickets.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-text-muted">
				No tickets found for the selected filters.
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-lg border border-border bg-surface">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border-subtle text-left text-text-muted">
						<th className="px-4 py-3 font-medium">Ticket</th>
						<th className="px-4 py-3 font-medium">From</th>
						<th className="px-4 py-3 font-medium">Status</th>
						<th className="px-4 py-3 font-medium">Last activity</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map(t => (
						<tr
							key={t.id}
							className="border-b border-border-subtle last:border-0 hover:bg-surface-subtle">
							<td className="px-4 py-3">
								<Link
									href={`/owner/support/${t.id}`}
									className="text-text-primary font-medium hover:text-brand-purple-dark transition-colors">
									{t.subject}
								</Link>
								<div className="text-xs text-text-muted">{t.ticketNumber}</div>
							</td>
							<td className="px-4 py-3">
								<div className="text-text-primary">
									{t.user?.name ?? t.guestName ?? "—"}
								</div>
								<div className="text-xs text-text-muted">
									{t.user?.email ?? t.guestEmail}
									{!t.user && (
										<span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-surface-muted text-text-muted">
											Guest
										</span>
									)}
								</div>
							</td>
							<td className="px-4 py-3">
								<TicketStatusBadge status={t.status} />
							</td>
							<td className="px-4 py-3 text-text-muted">
								{new Date(t.lastMessageAt).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
