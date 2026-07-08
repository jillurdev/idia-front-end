import { Calendar, Clock, ArrowRight } from "lucide-react";

const FEATURED = {
	title: "5 Editing Tricks That Make Templates Feel Custom",
	excerpt:
		"A few small adjustments — timing, color, typography — separate a template that looks 'off the shelf' from one that feels built for your project. Here's what to change first.",
	category: "Workflow",
	date: "June 28, 2026",
	readTime: "6 min read",
};

const POSTS = [
	{
		title: "Choosing the Right Codec for Delivery",
		excerpt:
			"ProRes, H.264, or DNxHD? A quick guide to picking export settings your client's platform will actually accept.",
		category: "Technical",
		date: "June 21, 2026",
		readTime: "4 min read",
	},
	{
		title: "Building a Title Sequence in Under an Hour",
		excerpt:
			"A practical walkthrough using layered type, motion overlays, and a two-tone palette to keep things fast and clean.",
		category: "Tutorial",
		date: "June 14, 2026",
		readTime: "8 min read",
	},
	{
		title: "What Makes an Overlay Pack Worth Buying",
		excerpt:
			"Resolution, alpha channels, and variety matter more than volume. Here's what to check before you add to cart.",
		category: "Guides",
		date: "June 5, 2026",
		readTime: "5 min read",
	},
	{
		title: "Color Grading for Social vs. Broadcast",
		excerpt:
			"The same footage needs different treatment depending on where it lands. A look at contrast, saturation, and safe ranges for each.",
		category: "Workflow",
		date: "May 29, 2026",
		readTime: "7 min read",
	},
	{
		title: "Organizing Assets So Future You Says Thanks",
		excerpt:
			"A folder and naming convention for templates, overlays, and footage that scales past your third project.",
		category: "Guides",
		date: "May 20, 2026",
		readTime: "5 min read",
	},
	{
		title: "Licensing, Explained in Plain Terms",
		excerpt:
			"Standard vs. extended licenses, what counts as an 'end product,' and when you actually need to upgrade.",
		category: "Licensing",
		date: "May 12, 2026",
		readTime: "6 min read",
	},
];

export default function BlogPage() {
	return (
		<div className="bg-brand-white">
			{/* Hero */}
			<section className="relative bg-brand-navy py-24 overflow-hidden">
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-brand-purple/5" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-brand-cyan/8" />
				</div>

				<div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan/70 font-medium mb-4">
						The Journal
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Notes on{" "}
						<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
							craft
						</span>{" "}
						and workflow
					</h1>
					<p className="mt-5 text-brand-white/50 text-[15px] font-light leading-relaxed max-w-lg mx-auto">
						Tutorials, guides, and field notes for editors, designers, and
						filmmakers.
					</p>
				</div>
			</section>

			{/* Featured post */}
			<section className="py-20">
				<div className="max-w-5xl mx-auto px-4 sm:px-6">
					<a
						href="#"
						className="group grid sm:grid-cols-2 gap-8 items-center rounded-2xl border border-border p-6 sm:p-10 hover:border-brand-purple/30 hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)] transition-all duration-300">
						<div className="aspect-video rounded-xl bg-[image:var(--gradient-brand-soft)] border border-border-subtle" />
						<div>
							<p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple-dark font-medium mb-3">
								Featured · {FEATURED.category}
							</p>
							<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy leading-snug">
								{FEATURED.title}
							</h2>
							<p className="mt-3 text-[14px] text-text-secondary/80 font-light leading-relaxed">
								{FEATURED.excerpt}
							</p>
							<div className="mt-5 flex items-center gap-4 text-[12px] text-text-secondary/60 font-light">
								<span className="flex items-center gap-1.5">
									<Calendar className="w-3.5 h-3.5" /> {FEATURED.date}
								</span>
								<span className="flex items-center gap-1.5">
									<Clock className="w-3.5 h-3.5" /> {FEATURED.readTime}
								</span>
							</div>
							<span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-purple-dark group-hover:gap-2.5 transition-all duration-200">
								Read article <ArrowRight className="w-4 h-4" />
							</span>
						</div>
					</a>
				</div>
			</section>

			{/* Post grid */}
			<section className="py-4 pb-24 bg-surface-subtle">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{POSTS.map(post => (
							<a
								key={post.title}
								href="#"
								className="group flex flex-col rounded-xl border border-border bg-brand-white overflow-hidden hover:border-brand-purple/30 hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)] transition-all duration-300">
								<div className="aspect-[16/10] bg-[image:var(--gradient-brand-soft)] border-b border-border-subtle" />
								<div className="p-6 flex flex-col flex-1">
									<p className="text-[10px] tracking-[0.25em] uppercase text-brand-purple-dark font-medium mb-2.5">
										{post.category}
									</p>
									<h3 className="font-serif text-base font-semibold text-brand-navy leading-snug">
										{post.title}
									</h3>
									<p className="mt-2 text-[13px] text-text-secondary/70 font-light leading-relaxed flex-1">
										{post.excerpt}
									</p>
									<div className="mt-5 flex items-center gap-3 text-[11px] text-text-secondary/60 font-light">
										<span className="flex items-center gap-1">
											<Calendar className="w-3 h-3" /> {post.date}
										</span>
										<span className="flex items-center gap-1">
											<Clock className="w-3 h-3" /> {post.readTime}
										</span>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
