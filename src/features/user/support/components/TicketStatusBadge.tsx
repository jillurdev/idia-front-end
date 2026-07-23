import { cn } from "@/lib/utils";
import type { TicketStatus } from "../types";

const STATUS_STYLES: Record<TicketStatus, string> = {
	OPEN: "bg-amber-50 text-amber-700 border-amber-200",
	IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
	RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	CLOSED: "bg-surface-muted text-text-muted border-border",
};

const STATUS_LABEL: Record<TicketStatus, string> = {
	OPEN: "Open",
	IN_PROGRESS: "In progress",
	RESOLVED: "Resolved",
	CLOSED: "Closed",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border",
				STATUS_STYLES[status],
			)}>
			{STATUS_LABEL[status]}
		</span>
	);
}
