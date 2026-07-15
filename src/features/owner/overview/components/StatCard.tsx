import type { LucideIcon } from "lucide-react";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: LucideIcon;
	isLoading?: boolean;
}

export function StatCard({
	label,
	value,
	icon: Icon,
	isLoading,
}: StatCardProps) {
	return (
		<div className="p-5 rounded-xl border border-border bg-brand-white">
			<div className="flex items-center justify-between mb-3">
				<div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center">
					<Icon className="w-5 h-5 text-brand-purple-dark" />
				</div>
			</div>

			{isLoading ? (
				<div className="h-8 w-20 animate-pulse rounded bg-surface-muted" />
			) : (
				<p className="font-serif text-2xl font-semibold text-brand-navy">
					{value}
				</p>
			)}

			<p className="text-[12px] text-text-secondary/50 mt-1">{label}</p>
		</div>
	);
}
