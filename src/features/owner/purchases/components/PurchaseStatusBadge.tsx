import type { PaymentStatus } from "../types";

const STATUS_MAP: Record<PaymentStatus, { label: string; className: string }> =
	{
		COMPLETED: {
			label: "Completed",
			className: "bg-emerald-50 text-emerald-600",
		},
		PENDING: {
			label: "Pending",
			className: "bg-amber-50 text-amber-600",
		},
		FAILED: {
			label: "Failed",
			className: "bg-red-50 text-red-500",
		},
		REFUNDED: {
			label: "Refunded",
			className: "bg-surface-muted text-text-muted",
		},
	};

export function PurchaseStatusBadge({ status }: { status: PaymentStatus }) {
	const { label, className } = STATUS_MAP[status];

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${className}`}>
			{label}
		</span>
	);
}
