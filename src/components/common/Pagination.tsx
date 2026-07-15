import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/paginated-response";

interface PaginationProps {
	meta: PaginationMeta;
	onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
	const { page, totalPages, total, limit } = meta;

	if (totalPages <= 1) return null;

	const from = total === 0 ? 0 : (page - 1) * limit + 1;
	const to = Math.min(page * limit, total);

	// Show a compact window of page numbers around the current page
	const windowSize = 2;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
		p => p === 1 || p === totalPages || Math.abs(p - page) <= windowSize,
	);

	return (
		<div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle px-4 py-3 text-sm">
			<span className="text-text-muted">
				Showing {from}–{to} of {total}
			</span>

			<div className="flex items-center gap-1">
				<button
					onClick={() => onPageChange(page - 1)}
					disabled={page <= 1}
					className="h-8 rounded-md px-3 text-text-secondary hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent">
					Prev
				</button>

				{pages.map((p, idx) => {
					const prev = pages[idx - 1];
					const showEllipsis = prev !== undefined && p - prev > 1;
					return (
						<span key={p} className="flex items-center gap-1">
							{showEllipsis && <span className="px-1 text-text-muted">…</span>}
							<button
								onClick={() => onPageChange(p)}
								className={cn(
									"h-8 min-w-8 rounded-md px-2 text-sm",
									p === page
										? "bg-accent text-brand-white"
										: "text-text-secondary hover:bg-surface-subtle",
								)}>
								{p}
							</button>
						</span>
					);
				})}

				<button
					onClick={() => onPageChange(page + 1)}
					disabled={page >= totalPages}
					className="h-8 rounded-md px-3 text-text-secondary hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent">
					Next
				</button>
			</div>
		</div>
	);
}
