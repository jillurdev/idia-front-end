"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Play, Star, Users } from "lucide-react";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
	const reviewCount = product._count?.reviews ?? 0;
	const purchaseCount = product._count?.purchases ?? 0;

	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		if (!product.previewVideoUrl) return;
		setIsHovering(true);
		// Play can reject if the pointer leaves before the video is ready —
		// that's fine, just ignore it.
		videoRef.current?.play().catch(() => {});
	};

	const handleMouseLeave = () => {
		if (!product.previewVideoUrl) return;
		setIsHovering(false);
		const video = videoRef.current;
		if (video) {
			video.pause();
			video.currentTime = 0;
		}
	};

	return (
		<Link
			href={`/products/${product.slug}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] bg-brand-white rounded-xl overflow-hidden border border-border hover:border-brand-purple/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.10)] transition-all duration-300">
			<div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
				<img
					src={product.thumbnailUrl}
					alt={product.title}
					className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
						isHovering && product.previewVideoUrl ? "opacity-0" : "opacity-100"
					}`}
				/>
				{product.previewVideoUrl && (
					<video
						ref={videoRef}
						src={product.previewVideoUrl}
						muted
						loop
						playsInline
						preload="none"
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
							isHovering ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
					/>
				)}
				{product.previewVideoUrl && (
					<div
						className={`absolute top-3 right-3 w-7 h-7 rounded-full bg-brand-white/90 flex items-center justify-center transition-opacity duration-300 ${
							isHovering ? "opacity-0" : "opacity-100"
						}`}>
						<Play className="w-3 h-3 text-brand-navy fill-brand-navy ml-0.5" />
					</div>
				)}
				<div className="absolute top-3 left-3">
					<span className="px-2 py-0.5 bg-brand-navy/80 backdrop-blur-sm text-brand-white text-[10px] font-medium rounded-full tracking-wide">
						{product.category.name}
					</span>
				</div>
			</div>

			<div className="p-4">
				<h3 className="text-[14px] font-semibold text-brand-navy group-hover:text-brand-purple-dark transition-colors leading-snug">
					{product.title}
				</h3>

				<div className="mt-2 flex items-center justify-between">
					{reviewCount > 0 ? (
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 fill-brand-cyan text-brand-cyan" />
							<span className="text-[11px] text-text-secondary/70 font-medium">
								{reviewCount} {reviewCount === 1 ? "review" : "reviews"}
							</span>
						</div>
					) : (
						<span className="text-[11px] text-text-secondary/40">
							No reviews yet
						</span>
					)}

					<div className="flex items-center gap-1">
						<span className="text-[11px] text-text-secondary/50 font-light">
							from
						</span>
						<span className="font-serif text-[16px] font-semibold text-brand-navy">
							${product.price}
						</span>
					</div>
				</div>

				{purchaseCount > 0 && (
					<div className="mt-2 flex items-center gap-1">
						<Users
							className="w-3 h-3 text-text-secondary/40"
							aria-hidden="true"
						/>
						<span className="text-[11px] text-text-secondary/50 font-light">
							{purchaseCount.toLocaleString()} purchased
						</span>
					</div>
				)}
			</div>
		</Link>
	);
}
