import Link from "next/link";
import { ArrowRight, Play, Check } from "lucide-react";

export default function HeroSection() {
	return (
		<section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-navy">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-purple/5" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-brand-cyan/7" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-brand-purple/10" />
				<div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-brand-purple/20" />
				<div className="absolute top-10 right-10 w-16 h-16 border-t border-r border-brand-purple/20" />
				<div className="absolute bottom-10 left-10 w-16 h-16 border-b border-l border-brand-purple/20" />
				<div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-brand-purple/20" />
				<div className="absolute inset-0 bg-[image:var(--gradient-brand-soft)] opacity-40" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
				<div className="max-w-3xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/25 bg-brand-purple/8 mb-8">
						<span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
						<span className="text-brand-purple-light text-[11px] tracking-[0.2em] uppercase font-medium">
							Premium Digital Assets
						</span>
					</div>

					<h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-brand-white leading-[1.08] tracking-tight">
						Elevate Your{" "}
						<span className="relative inline-block">
							<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
								Creative
							</span>
							<svg
								className="absolute -bottom-1 left-0 w-full"
								height="3"
								viewBox="0 0 100 3"
								preserveAspectRatio="none">
								<line
									x1="0"
									y1="1.5"
									x2="100"
									y2="1.5"
									stroke="#a855f7"
									strokeWidth="1"
									strokeOpacity="0.4"
									strokeDasharray="4 2"
								/>
							</svg>
						</span>{" "}
						Vision
					</h1>

					<p className="mt-6 text-brand-white/50 text-lg font-light leading-relaxed max-w-xl mx-auto font-sans">
						A curated marketplace of premium motion graphics, templates, and
						digital assets — crafted for creators who demand excellence.
					</p>

					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="/products"
							className="group flex items-center gap-2.5 px-8 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200 active:scale-[0.98]">
							Browse Collection
							<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
						</Link>

						<Link
							href="/categories"
							className="flex items-center gap-2.5 px-8 py-4 border border-brand-white/15 text-brand-white/80 text-[13px] font-medium tracking-widest uppercase rounded-[6px] hover:border-brand-cyan/40 hover:text-brand-white transition-all duration-200">
							<Play className="w-3.5 h-3.5" />
							View Categories
						</Link>
					</div>

					<div className="mt-14 flex items-center justify-center gap-6 flex-wrap">
						{["No subscription", "Instant download", "Commercial license"].map(
							item => (
								<div key={item} className="flex items-center gap-1.5">
									<Check className="w-3.5 h-3.5 text-brand-cyan" />
									<span className="text-brand-white/40 text-[12px] font-light tracking-wide">
										{item}
									</span>
								</div>
							),
						)}
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-white to-transparent pointer-events-none" />
		</section>
	);
}
