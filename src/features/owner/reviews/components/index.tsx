"use client";

import { useState } from "react";
import { useReviews } from "@/features/owner/reviews/hooks/useReviews";
import { ReviewTable } from "@/features/owner/reviews/components/ReviewTable";

type FilterTab = "all" | "pending" | "approved";

const TABS: { label: string; value: FilterTab }[] = [
	{ label: "All", value: "all" },
	{ label: "Pending", value: "pending" },
	{ label: "Approved", value: "approved" },
];

const FILTER_MAP: Record<FilterTab, boolean | undefined> = {
	all: undefined,
	pending: false,
	approved: true,
};

export default function Reviews () {
	const [activeTab, setActiveTab] = useState<FilterTab>("all");
	const { data: reviews = [], isLoading } = useReviews(FILTER_MAP[activeTab]);

	const pending = reviews.filter(r => !r.isApproved).length;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-serif text-2xl font-semibold text-brand-navy">
						Reviews
					</h1>
					<p className="text-sm text-text-muted mt-0.5">
						{reviews.length} total
						{pending > 0 && (
							<span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600">
								{pending} pending approval
							</span>
						)}
					</p>
				</div>
			</div>

			{/* Filter tabs */}
			<div className="flex items-center gap-1 p-1 bg-surface-subtle rounded-lg w-fit border border-border">
				{TABS.map(tab => (
					<button
						key={tab.value}
						onClick={() => setActiveTab(tab.value)}
						className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 ${
							activeTab === tab.value
								? "bg-surface text-brand-navy shadow-sm border border-border"
								: "text-text-muted hover:text-text-primary"
						}`}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex justify-center py-16">
					<div className="w-6 h-6 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
				</div>
			) : (
				<ReviewTable reviews={reviews} />
			)}
		</div>
	);
}
