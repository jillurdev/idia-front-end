"use client";

import { useEffect, useState, useTransition } from "react";
import { Star, Trash2, Loader2 } from "lucide-react";

interface Review {
	id: string;
	rating: number;
	comment: string | null;
	isApproved: boolean;
	createdAt: string;
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnailUrl: string;
	};
}

export default function MyReviewsSection() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		fetch("/api/user/reviews")
			.then(r => r.json())
			.then(data => {
				setReviews(data.reviews ?? []);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	function handleDelete(id: string) {
		setDeletingId(id);
		startTransition(async () => {
			await fetch(`/api/user/reviews/${id}`, { method: "DELETE" });
			setReviews(prev => prev.filter(r => r.id !== id));
			setDeletingId(null);
		});
	}

	if (loading) {
		return (
			<div className="space-y-3">
				{Array(2)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className="h-24 rounded-xl bg-[#f5f0e8] animate-pulse"
						/>
					))}
			</div>
		);
	}

	if (reviews.length === 0) {
		return (
			<div className="text-center py-10 space-y-2">
				<Star className="w-8 h-8 text-[#e4d8c4] mx-auto" strokeWidth={1.5} />
				<p className="text-sm text-[#9c8e7e]">
					You haven't reviewed anything yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-5">
			<h2 className="text-[15px] font-semibold text-[#0d0d0d]">My reviews</h2>
			<div className="space-y-3">
				{reviews.map(review => (
					<div
						key={review.id}
						className="flex gap-3 p-4 rounded-xl border border-[#eadfce] bg-[#faf7f2]">
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
										className="text-sm font-medium text-[#0d0d0d] hover:text-[#c8a96e] transition-colors line-clamp-1">
										{review.product.title}
									</a>
									<div className="flex items-center gap-1 mt-0.5">
										{Array(5)
											.fill(0)
											.map((_, i) => (
												<Star
													key={i}
													className="w-3 h-3"
													fill={i < review.rating ? "#c8a96e" : "none"}
													stroke={i < review.rating ? "#c8a96e" : "#d1c4b0"}
												/>
											))}
									</div>
								</div>
								<div className="flex items-center gap-2 shrink-0">
									<span
										className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
											review.isApproved
												? "bg-emerald-100 text-emerald-700"
												: "bg-[#f5f0e8] text-[#9c8e7e]"
										}`}>
										{review.isApproved ? "Approved" : "Pending"}
									</span>
									<button
										onClick={() => handleDelete(review.id)}
										disabled={isPending && deletingId === review.id}
										className="w-7 h-7 rounded-lg flex items-center justify-center text-[#c0a08e] hover:bg-red-50 hover:text-red-500 transition-colors">
										{isPending && deletingId === review.id ? (
											<Loader2 className="w-3.5 h-3.5 animate-spin" />
										) : (
											<Trash2 className="w-3.5 h-3.5" />
										)}
									</button>
								</div>
							</div>
							{review.comment && (
								<p className="text-[12px] text-[#5c5244] line-clamp-2">
									{review.comment}
								</p>
							)}
							<p className="text-[11px] text-[#9c8e7e]">
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
