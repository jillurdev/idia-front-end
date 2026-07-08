import { PRODUCTS } from "@/lib/data/product";
import { Star, ShieldCheck, Download, RefreshCw } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = PRODUCTS.find(p => p.slug === id);

	if (!product) {
		notFound();
	}

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

						{product.images.length > 0 && (
							<div className="mt-4 grid grid-cols-3 gap-3">
								{product.images.map((img, i) => (
									<div
										key={i}
										className="aspect-[3/2] rounded-lg overflow-hidden border border-border">
										<img
											src={img}
											alt=""
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

							<div className="mt-5 flex flex-wrap gap-2">
								{product.tags.map(tag => (
									<span
										key={tag}
										className="px-3 py-1 rounded-full bg-surface-subtle border border-border text-[11px] text-text-secondary/70">
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Reviews */}
						<div className="mt-12">
							<h2 className="font-serif text-xl font-semibold text-brand-navy mb-5">
								Reviews ({product.reviewCount})
							</h2>
							<div className="space-y-4">
								{product.reviews.map(r => (
									<div
										key={r.name}
										className="p-5 rounded-xl border border-border bg-surface-subtle">
										<div className="flex items-center gap-3 mb-2">
											<div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-brand-white text-[11px] font-semibold">
												{r.avatar}
											</div>
											<div>
												<p className="text-[13px] font-semibold text-brand-navy">
													{r.name}
												</p>
												<div className="flex gap-0.5">
													{Array.from({ length: r.rating }).map((_, i) => (
														<Star
															key={i}
															className="w-3 h-3 fill-brand-cyan text-brand-cyan"
														/>
													))}
												</div>
											</div>
										</div>
										<p className="text-[13px] text-text-secondary/70 font-light leading-relaxed">
											{r.comment}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Buy box */}
					<div className="lg:col-span-2">
						<div className="sticky top-24 p-6 rounded-2xl border border-border bg-surface-subtle">
							<span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple-dark text-[10px] font-medium rounded-full tracking-wide">
								{product.category}
							</span>

							<h1 className="mt-4 font-serif text-2xl font-semibold text-brand-navy leading-tight">
								{product.title}
							</h1>

							<div className="mt-3 flex items-center gap-2">
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`w-3.5 h-3.5 ${
												i < Math.round(product.rating)
													? "fill-brand-cyan text-brand-cyan"
													: "fill-border text-border"
											}`}
										/>
									))}
								</div>
								<span className="text-[12px] text-text-secondary/60">
									{product.rating} ({product.reviewCount} reviews)
								</span>
							</div>

							<div className="mt-5 flex items-baseline gap-1">
								<span className="font-serif text-4xl font-semibold text-brand-navy">
									${product.price}
								</span>
								<span className="text-[13px] text-text-secondary/50">USD</span>
							</div>

							<button className="mt-6 w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200 active:scale-[0.98]">
								<Download className="w-4 h-4" />
								Buy Now
							</button>

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
