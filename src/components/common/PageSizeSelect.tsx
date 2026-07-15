import { PAGE_SIZE_OPTIONS, type PageSize } from "@/hooks/common/usePagination";

interface PageSizeSelectProps {
	value: PageSize;
	onChange: (value: PageSize) => void;
}

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
	return (
		<label className="flex items-center gap-2 text-sm text-text-muted">
			Rows per page
			<select
				value={value}
				onChange={e => onChange(Number(e.target.value) as PageSize)}
				className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-glow">
				{PAGE_SIZE_OPTIONS.map(size => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</label>
	);
}
