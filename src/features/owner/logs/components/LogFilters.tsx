import { SearchInput } from "@/components/common/SearchInput";
import type { LogAction } from "../types";

const ALL_ACTIONS: LogAction[] = [
	"CREATE",
	"UPDATE",
	"DELETE",
	"PUBLISH",
	"UNPUBLISH",
	"LOGIN",
	"LOGOUT",
	"EMAIL_SENT",
	"PURCHASE",
	"DOWNLOAD",
	"ROLE_CHANGE",
	"SETTING_CHANGE",
];

interface LogFiltersProps {
	entity: string;
	onEntityChange: (value: string) => void;
	action: LogAction | "ALL";
	onActionChange: (value: LogAction | "ALL") => void;
	search: string;
	onSearchChange: (value: string) => void;
	onClear: () => void;
}

export function LogFilters({
	entity,
	onEntityChange,
	action,
	onActionChange,
	search,
	onSearchChange,
	onClear,
}: LogFiltersProps) {
	return (
		<div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
			<SearchInput
				value={search}
				onChange={onSearchChange}
				placeholder="Search entity, detail, actor, IP…"
			/>

			<input
				type="text"
				placeholder="Filter by entity"
				value={entity}
				onChange={e => onEntityChange(e.target.value)}
				className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-glow"
			/>

			<select
				value={action}
				onChange={e => onActionChange(e.target.value as LogAction | "ALL")}
				className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-glow">
				<option value="ALL">All actions</option>
				{ALL_ACTIONS.map(a => (
					<option key={a} value={a}>
						{a.replace(/_/g, " ")}
					</option>
				))}
			</select>

			<button
				onClick={onClear}
				className="text-sm text-text-muted hover:text-accent">
				Clear filters
			</button>
		</div>
	);
}
