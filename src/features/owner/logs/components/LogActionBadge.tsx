import { cn } from "@/lib/utils";
import type { LogAction } from "../types";

const ACTION_STYLES: Record<LogAction, string> = {
	CREATE: "bg-accent2-subtle text-brand-cyan-dark",
	UPDATE: "bg-accent-subtle text-brand-purple-dark",
	DELETE: "bg-red-100 text-red-700",
	PUBLISH: "bg-accent2-subtle text-brand-cyan-dark",
	UNPUBLISH: "bg-surface-muted text-text-muted",
	LOGIN: "bg-surface-muted text-text-secondary",
	LOGOUT: "bg-surface-muted text-text-secondary",
	EMAIL_SENT: "bg-accent-subtle text-brand-purple-dark",
	PURCHASE: "bg-accent2-subtle text-brand-cyan-dark",
	DOWNLOAD: "bg-surface-muted text-text-secondary",
	ROLE_CHANGE: "bg-red-100 text-red-700",
	SETTING_CHANGE: "bg-accent-subtle text-brand-purple-dark",
};

export function LogActionBadge({ action }: { action: LogAction }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				ACTION_STYLES[action],
			)}>
			{action.replace(/_/g, " ")}
		</span>
	);
}
