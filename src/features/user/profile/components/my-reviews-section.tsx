"use client";

import { Star, Trash2, Loader2 } from "lucide-react";
import { useMyReviews } from "@/features/user/reviews/hooks/useMyReviews";

export default function MyReviewsSection() {
	const { data: reviews = [], isLoading } = useMyReviews();
	// const { deleteReview, deletingId } = useDeleteReview();

	if (isLoading) {
		return (
			<div className="space-y-3">
				{Array(2)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className="h-24 rounded-xl bg-surface-subtle animate-pulse"
						/>
					))}
			</div>
		);
	}

	if (reviews.length === 0) {
		return (
			<div className="text-center py-10 space-y-2">
				<Star className="w-8 h-8 text-border mx-auto" strokeWidth={1.5} />
				<p className="text-sm text-text-muted">
					You haven't reviewed anything yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-5">
			<h2 className="text-[15px] font-semibold text-brand-navy">My reviews</h2>
			<div className="space-y-3">
				{reviews.map(review => (
					<div
						key={review.id}
						className="flex gap-3 p-4 rounded-xl border border-border bg-surface-subtle/40">
						{/* Thumbnail */}
						<a href={`/products/${review.product.slug}`} className="shrink-0">
							<img
								src={review.product.thumbnailUrl}
								alt={review.product.title}
								className="w-12 h-12 rounded-lg object-cover"
							/>
						</a>

						{/* Content */}
						<div className="flex-1 min-w-0 space-y-1">
							<div className="flex items-start justify-between gap-2">
								<div>
									<a
										href={`/products/${review.product.slug}`}
										className="text-sm font-medium text-brand-navy hover:text-brand-purple-dark transition-colors line-clamp-1">
										{review.product.title}
									</a>
									<div className="flex items-center gap-1 mt-0.5">
										{Array(5)
											.fill(0)
											.map((_, i) => (
												<Star
													key={i}
													className="w-3 h-3"
													fill={
														i < review.rating
															? "var(--color-brand-purple)"
															: "none"
													}
													stroke={
														i < review.rating
															? "var(--color-brand-purple)"
															: "var(--color-border)"
													}
												/>
											))}
									</div>
								</div>
								<div className="flex items-center gap-2 shrink-0">
									<span
										className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
											review.isApproved
												? "bg-emerald-100 text-emerald-700"
												: "bg-surface-subtle text-text-muted"
										}`}>
										{review.isApproved ? "Approved" : "Pending"}
									</span>
									{/* <button
										onClick={() => deleteReview(review.id)}
										disabled={deletingId === review.id}
										className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50">
										{deletingId === review.id ? (
											<Loader2 className="w-3.5 h-3.5 animate-spin" />
										) : (
											<Trash2 className="w-3.5 h-3.5" />
										)}
									</button> */}
								</div>
							</div>
							{review.comment && (
								<p className="text-[12px] text-text-secondary line-clamp-2">
									{review.comment}
								</p>
							)}
							<p className="text-[11px] text-text-muted">
								{new Date(review.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
