"use client";

import { ShieldCheck, Download, RefreshCw, Heart } from "lucide-react";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { useProductBySlug } from "../hooks/useProducts";
import { useCheckout } from "@/features/user/purchases/hooks/useCheckout";
import { useMySaved } from "@/features/user/saved/hooks/useMySaved";
import { useToggleSaved } from "@/features/user/saved/hooks/useToggleSaved";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetailClient() {
	const params = useParams<{ id: string }>();
	const slug = params.id; // route folder is [id] but the value passed is the product slug
	const pathname = usePathname();
	const router = useRouter();
	const { user } = useAuth();

	const { data: product, isLoading, isError } = useProductBySlug(slug);
	const { buyNow, isPending } = useCheckout();
	const { data: savedItems } = useMySaved(!!user);
	const { toggle, isToggling } = useToggleSaved();

	if (isError) {
		notFound();
	}

	if (isLoading || !product) {
		return (
			<div className="py-24 text-center text-sm text-text-secondary/60">
				Loading…
			</div>
		);
	}

	const galleryImages = product.images.filter(img => !img.isCover);
	const isSaved =
		savedItems?.some(item => item.product.id === product.id) ?? false;

	return (
		<div className="bg-brand-white">
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
					{/* Media */}
					<div className="lg:col-span-3">
						<div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brand-navy">
							<img
								src={product.thumbnailUrl}
								alt={product.title}
								className="w-full h-full object-cover"
							/>
						</div>

						{galleryImages.length > 0 && (
							<div className="mt-4 grid grid-cols-3 gap-3">
								{galleryImages.map(img => (
									<div
										key={img.id}
										className="aspect-[3/2] rounded-lg overflow-hidden border border-border">
										<img
											src={img.url}
											alt={img.altText ?? ""}
											className="w-full h-full object-cover"
										/>
									</div>
								))}
							</div>
						)}

						{/* Description */}
						<div className="mt-10">
							<h2 className="font-serif text-xl font-semibold text-brand-navy mb-3">
								About this asset
							</h2>
							<p className="text-[14px] text-text-secondary/75 font-light leading-relaxed">
								{product.description}
							</p>

							{product.tags.length > 0 && (
								<div className="mt-5 flex flex-wrap gap-2">
									{product.tags.map(({ tag }) => (
										<span
											key={tag.id}
											className="px-3 py-1 rounded-full bg-surface-subtle border border-border text-[11px] text-text-secondary/70">
											{tag.name}
										</span>
									))}
								</div>
							)}
						</div>

						{/* Reviews — TODO: backend does not include reviews on this endpoint yet */}
					</div>

					{/* Buy box */}
					<div className="lg:col-span-2">
						<div className="sticky top-24 p-6 rounded-2xl border border-border bg-surface-subtle">
							<span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple-dark text-[10px] font-medium rounded-full tracking-wide">
								{product.category.name}
							</span>

							<h1 className="mt-4 font-serif text-2xl font-semibold text-brand-navy leading-tight">
								{product.title}
							</h1>

							<div className="mt-5 flex items-baseline gap-1">
								<span className="font-serif text-4xl font-semibold text-brand-navy">
									${product.price}
								</span>
								<span className="text-[13px] text-text-secondary/50">USD</span>
							</div>

							{/* Login-gated LemonSqueezy checkout */}
							<div className="mt-6 flex gap-2.5">
								<button
									onClick={() => buyNow(product.id, pathname)}
									disabled={isPending}
									className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100">
									{isPending ? (
										<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									) : (
										<Download className="w-4 h-4" />
									)}
									{isPending ? "Redirecting…" : "Buy Now"}
								</button>

								<button
									onClick={() => {
										if (!user) {
											router.push(
												`/login?next=${encodeURIComponent(pathname)}`,
											);
											return;
										}
										toggle(product.id);
									}}
									disabled={isToggling}
									aria-label={isSaved ? "Remove from saved" : "Save item"}
									className="flex-shrink-0 w-[52px] flex items-center justify-center border border-border rounded-[6px] hover:border-brand-purple/40 transition-colors disabled:opacity-60">
									<Heart
										className={`w-5 h-5 transition-colors ${
											isSaved
												? "fill-brand-purple text-brand-purple"
												: "text-brand-black/40"
										}`}
									/>
								</button>
							</div>

							<div className="mt-6 space-y-3 pt-6 border-t border-border">
								<div className="flex items-center gap-2.5">
									<ShieldCheck className="w-4 h-4 text-brand-purple-dark flex-shrink-0" />
									<span className="text-[12px] text-text-secondary/70">
										Secure checkout via LemonSqueezy
									</span>
								</div>
								<div className="flex items-center gap-2.5">
									<Download className="w-4 h-4 text-brand-purple-dark flex-shrink-0" />
									<span className="text-[12px] text-text-secondary/70">
										Instant digital download
									</span>
								</div>
								<div className="flex items-center gap-2.5">
									<RefreshCw className="w-4 h-4 text-brand-purple-dark flex-shrink-0" />
									<span className="text-[12px] text-text-secondary/70">
										Commercial license included
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
