import { Sparkles, Target, Heart, Award } from "lucide-react";

const VALUES = [
	{
		icon: Sparkles,
		title: "Crafted with Care",
		desc: "Every asset is meticulously designed and reviewed before it reaches the marketplace.",
	},
	{
		icon: Target,
		title: "Built for Creators",
		desc: "We design for editors, designers, and filmmakers who need assets that just work.",
	},
	{
		icon: Heart,
		title: "Genuine Passion",
		desc: "Motion graphics isn't just our product — it's our craft and our obsession.",
	},
	{
		icon: Award,
		title: "Premium Quality",
		desc: "No filler content. Every product meets a high bar before publishing.",
	},
];

export default function AboutPage() {
	return (
		<div className="bg-brand-white">
			{/* Hero */}
			<section className="relative bg-brand-navy py-28 overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-brand-purple/5" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-brand-cyan/8" />
				</div>

				<div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan/70 font-medium mb-4">
						Our Story
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Designing the tools{" "}
						<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
							creators
						</span>{" "}
						reach for
					</h1>
					<p className="mt-5 text-brand-white/50 text-[15px] font-light leading-relaxed max-w-xl mx-auto">
						IdiaDesigns is a curated marketplace for premium motion graphics and
						digital assets — built by a creator, for creators.
					</p>
				</div>
			</section>

			{/* Story */}
			<section className="py-24">
				<div className="max-w-3xl mx-auto px-4 sm:px-6">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple-dark font-medium mb-4 text-center">
						Why IdiaDesigns
					</p>
					<h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-navy text-center leading-tight">
						Started from a simple frustration
					</h2>

					<div className="mt-8 space-y-5 text-[15px] text-text-secondary/80 font-light leading-relaxed">
						<p>
							After years of working on motion graphics projects, it became
							clear that most marketplaces were flooded with low-effort, generic
							templates. Finding genuinely high-quality, ready-to-use assets
							took far too long.
						</p>
						<p>
							IdiaDesigns was built to fix that — a tightly curated catalog
							where every product is reviewed, tested, and crafted to actually
							save creators time, not waste it.
						</p>
						<p>
							Today, IdiaDesigns serves editors, designers, and filmmakers
							around the world with premium templates, overlays, and digital
							assets they can trust and license with confidence.
						</p>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-24 bg-surface-subtle">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-xl mx-auto">
						<p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple-dark font-medium mb-3">
							What We Stand For
						</p>
						<h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-navy leading-tight">
							Our Values
						</h2>
					</div>

					<div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{VALUES.map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="p-6 rounded-xl border border-border bg-brand-white hover:border-brand-purple/30 hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)] transition-all duration-300">
								<div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-purple/10 mb-4">
									<Icon className="w-5 h-5 text-brand-purple-dark" />
								</div>
								<h3 className="font-serif text-base font-semibold text-brand-navy mb-2">
									{title}
								</h3>
								<p className="text-[13px] text-text-secondary/70 font-light leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
					<h2 className="font-serif text-3xl font-semibold text-brand-navy">
						Ready to elevate your next project?
					</h2>
					<p className="mt-3 text-text-secondary/70 text-[14px] font-light">
						Browse the full collection and find assets that fit your vision.
					</p>
					<a
						href="/products"
						className="mt-8 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200">
						Browse Collection
					</a>
				</div>
			</section>
		</div>
	);
}
