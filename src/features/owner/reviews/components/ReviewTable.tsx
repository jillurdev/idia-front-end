"use client";

import { useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { useApproveReview, useDeleteReview } from "../hooks/useReviews";
import type { Review } from "../types";

interface ReviewTableProps {
	reviews: Review[];
}

export function ReviewTable({ reviews }: ReviewTableProps) {
	const { mutate: approve, isPending: isApproving } = useApproveReview();
	const { mutate: deleteReview } = useDeleteReview();
	const [approvingId, setApprovingId] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleApprove = (id: string) => {
		setApprovingId(id);
		approve(id, { onSettled: () => setApprovingId(null) });
	};

	const handleDelete = (review: Review) => {
		if (!confirm(`Delete this review by "${review.user.name}"?`)) return;
		setDeletingId(review.id);
		deleteReview(review.id, { onSettled: () => setDeletingId(null) });
	};

	if (reviews.length === 0) {
		return (
			<div className="text-center py-16 text-text-muted">
				<p className="text-sm">No reviews found.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle">
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							User
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden md:table-cell">
							Product
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Rating
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Comment
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium hidden lg:table-cell">
							Date
						</th>
						<th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Status
						</th>
						<th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border bg-surface">
					{reviews.map(review => (
						<tr
							key={review.id}
							className="hover:bg-surface-subtle transition-colors">
							{/* User */}
							<td className="px-4 py-3">
								<p className="font-medium text-text-primary text-[13px]">
									{review.user.name}
								</p>
								<p className="text-[11px] text-text-muted">
									{review.user.email}
								</p>
							</td>

							{/* Product */}
							<td className="px-4 py-3 hidden md:table-cell">
								<p className="text-[13px] text-text-primary line-clamp-1">
									{review.product.title}
								</p>
							</td>

							{/* Rating */}
							<td className="px-4 py-3">
								<StarRating rating={review.rating} />
							</td>

							{/* Comment */}
							<td className="px-4 py-3 hidden lg:table-cell">
								<p className="text-[12px] text-text-muted line-clamp-2 max-w-[240px]">
									{review.comment ?? (
										<span className="italic opacity-50">No comment</span>
									)}
								</p>
							</td>

							{/* Date */}
							<td className="px-4 py-3 hidden lg:table-cell">
								<span className="text-[12px] text-text-muted">
									{new Date(review.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</td>

							{/* Status */}
							<td className="px-4 py-3">
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
										review.isApproved
											? "bg-emerald-50 text-emerald-600"
											: "bg-amber-50 text-amber-600"
									}`}>
									{review.isApproved ? "Approved" : "Pending"}
								</span>
							</td>

							{/* Actions */}
							<td className="px-4 py-3">
								<div className="flex items-center justify-end gap-1">
									{!review.isApproved && (
										<button
											onClick={() => handleApprove(review.id)}
											disabled={approvingId === review.id || isApproving}
											className="p-1.5 rounded-lg text-text-muted hover:text-emerald-500 hover:bg-emerald-50 transition-colors disabled:opacity-40"
											title="Approve">
											<CheckCircle className="w-3.5 h-3.5" />
										</button>
									)}
									<button
										onClick={() => handleDelete(review)}
										disabled={deletingId === review.id}
										className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
										title="Delete">
										<Trash2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
