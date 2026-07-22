"use client";

import { useState } from "react";
import { Star, MessageSquare, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProductReviews } from "../hooks/useProductReviews";
import { useMyReviews } from "../hooks/useMyReviews";
import { useCreateReview } from "../hooks/useCreateReview";
import { useMyPurchases } from "../../purchases/hooks/useMyPurchases";

function StarRow({
	rating,
	size = "w-4 h-4",
}: {
	rating: number;
	size?: string;
}) {
	return (
		<div className="flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map(n => (
				<Star
					key={n}
					className={`${size} ${
						n <= rating
							? "fill-amber-400 text-amber-400"
							: "text-border"
					}`}
				/>
			))}
		</div>
	);
}

export default function ProductReviewsSection({
	productId,
}: {
	productId: string;
}) {
	const { user } = useAuth();
	const { data: reviews = [], isLoading } = useProductReviews(productId);
	const { data: myReviews = [] } = useMyReviews(!!user);
	const { data: myPurchases = [] } = useMyPurchases(!!user);
	const { createReview, isSubmitting } = useCreateReview();

	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState("");

	const hasPurchased = myPurchases.some(
		p => p.product.id === productId && p.status === "COMPLETED",
	);
	const alreadyReviewed = myReviews.some(r => r.product.id === productId);
	const canReview = !!user && hasPurchased && !alreadyReviewed;

	const avgRating =
		reviews.length > 0
			? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
			: 0;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (rating === 0) return;

		try {
			await createReview({
				productId,
				rating,
				comment: comment.trim() || undefined,
			});
			setRating(0);
			setComment("");
		} catch {
			// error toast already handled inside useCreateReview
		}
	};

	return (
		<div className="mt-10 pt-10 border-t border-border">
			<div className="flex items-center gap-3 mb-6">
				<h2 className="font-serif text-xl font-semibold text-brand-navy">
					Reviews
				</h2>
				{reviews.length > 0 && (
					<>
						<StarRow rating={Math.round(avgRating)} />
						<span className="text-[13px] text-text-secondary">
							{avgRating.toFixed(1)} ({reviews.length}{" "}
							{reviews.length === 1 ? "review" : "reviews"})
						</span>
					</>
				)}
			</div>

			{/* Write a review — only for buyers who haven't reviewed yet */}
			{canReview && (
				<form
					onSubmit={handleSubmit}
					className="mb-8 p-5 rounded-2xl border border-border bg-surface-subtle space-y-4">
					<p className="text-[13px] font-medium text-brand-navy">
						Write a review
					</p>

					<div
						className="flex items-center gap-1"
						onMouseLeave={() => setHoverRating(0)}>
						{[1, 2, 3, 4, 5].map(n => (
							<button
								key={n}
								type="button"
								onClick={() => setRating(n)}
								onMouseEnter={() => setHoverRating(n)}
								aria-label={`${n} star${n > 1 ? "s" : ""}`}>
								<Star
									className={`w-6 h-6 transition-colors ${
										n <= (hoverRating || rating)
											? "fill-amber-400 text-amber-400"
											: "text-border"
									}`}
								/>
							</button>
						))}
					</div>

					<textarea
						value={comment}
						onChange={e => setComment(e.target.value)}
						placeholder="Share your experience with this product (optional)"
						rows={3}
						className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition resize-none"
					/>

					<button
						type="submit"
						disabled={rating === 0 || isSubmitting}
						className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy text-brand-white text-sm font-medium hover:bg-[#252550] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm">
						{isSubmitting && (
							<Loader2 className="w-3.5 h-3.5 animate-spin" />
						)}
						Submit review
					</button>
				</form>
			)}

			{user && alreadyReviewed && (
				<p className="mb-6 text-[13px] text-text-secondary">
					You've already reviewed this product — thank you!
				</p>
			)}

			{user && !hasPurchased && !alreadyReviewed && (
				<p className="mb-6 text-[13px] text-text-muted">
					Purchase this product to leave a review.
				</p>
			)}

			{/* Reviews list */}
			{isLoading ? (
				<div className="space-y-3">
					{[1, 2].map(i => (
						<div
							key={i}
							className="h-20 rounded-xl bg-surface-subtle animate-pulse"
						/>
					))}
				</div>
			) : reviews.length === 0 ? (
				<div className="flex items-center gap-2.5 text-[13px] text-text-muted">
					<MessageSquare className="w-4 h-4" />
					No reviews yet — be the first to share your thoughts.
				</div>
			) : (
				<div className="space-y-5">
					{reviews.map(review => (
						<div
							key={review.id}
							className="pb-5 border-b border-border-subtle last:border-0">
							<div className="flex items-center gap-2.5 mb-1.5">
								<div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-[12px] font-semibold text-brand-purple-dark overflow-hidden">
									{review.user.avatar ? (
										<img
											src={review.user.avatar}
											alt={review.user.name}
											className="w-full h-full object-cover"
										/>
									) : (
										review.user.name.charAt(0).toUpperCase()
									)}
								</div>
								<div>
									<p className="text-[13px] font-medium text-brand-navy">
										{review.user.name}
									</p>
									<StarRow rating={review.rating} size="w-3 h-3" />
								</div>
								<span className="ml-auto text-[11px] text-text-muted">
									{new Date(review.createdAt).toLocaleDateString()}
								</span>
							</div>
							{review.comment && (
								<p className="text-[13px] text-text-secondary/80 leading-relaxed pl-10">
									{review.comment}
								</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
