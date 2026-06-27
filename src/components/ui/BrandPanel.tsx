import Link from "next/link";

export function BrandPanel() {
	return (
		<div className="hidden lg:flex w-[44%] bg-brand-navy flex-col items-center justify-center px-12 relative overflow-hidden">
			{/* Concentric ring ornaments */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[420px] h-[420px] rounded-full border border-brand-purple/10" />
			</div>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[280px] h-[280px] rounded-full border border-brand-purple/15" />
			</div>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="w-[150px] h-[150px] rounded-full border border-brand-purple/20" />
			</div>

			{/* Corner filigree */}
			<div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-brand-purple/30" />
			<div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-brand-purple/30" />
			<div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-brand-purple/30" />
			<div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-brand-purple/30" />

			{/* Back to home — top left */}
			<Link
				href="/"
				className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-brand-white/30 hover:text-brand-purple/70 transition-colors duration-200 text-[11px] tracking-widest uppercase font-light group">
				<svg
					className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 19.5L8.25 12l7.5-7.5"
					/>
				</svg>
				Home
			</Link>

			{/* Brand content — clickable logo */}
			<Link
				href="/"
				className="relative z-10 text-center animate-fade-up group">
				<p className="text-brand-purple/70 text-[10px] tracking-[0.4em] uppercase font-sans font-light mb-5">
					Est. MMXXIV
				</p>
				<h1 className="font-serif text-6xl font-semibold text-brand-white leading-none tracking-tight group-hover:text-brand-purple/90 transition-colors duration-300">
					Idia Designs
				</h1>
				<div className="ornament-divider my-5 px-8 text-brand-purple/60 text-[9px]">
					✦
				</div>
				<p className="font-serif italic text-brand-purple text-base tracking-wide">
					Where elegance meets excellence
				</p>
				<p className="mt-6 text-brand-white/40 text-[12px] font-sans font-light leading-relaxed max-w-[220px] mx-auto">
					A distinguished experience curated for those who appreciate the finest
					things.
				</p>
			</Link>
		</div>
	);
}
