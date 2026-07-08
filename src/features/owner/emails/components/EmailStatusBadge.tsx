import type { RecipientType } from "../types";

const labels: Record<RecipientType, string> = {
	SINGLE: "একজন",
	CUSTOM: "নির্বাচিত কয়েকজন",
	ALL: "সবাই",
	CUSTOMERS: "শুধু ক্রেতা",
	NON_CUSTOMERS: "যারা কিনেনি",
	SPECIFIC_CATEGORY: "নির্দিষ্ট Category",
};

const styles: Record<RecipientType, string> = {
	SINGLE: "bg-accent-subtle text-brand-purple-dark",
	CUSTOM: "bg-accent-subtle text-brand-purple-dark",
	ALL: "bg-accent2-subtle text-brand-cyan-dark",
	CUSTOMERS: "bg-accent2-subtle text-brand-cyan-dark",
	NON_CUSTOMERS: "bg-surface-muted text-text-secondary",
	SPECIFIC_CATEGORY: "bg-accent2-subtle text-brand-cyan-dark",
};

export function RecipientTypeBadge({ type }: { type: RecipientType }) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[type]}`}>
			{labels[type]}
		</span>
	);
}
