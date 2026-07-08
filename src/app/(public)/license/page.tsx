import { CheckCircle2, XCircle, HelpCircle, Mail } from "lucide-react";

const LICENSES = [
	{
		name: "Standard License",
		tagline: "For a single end product",
		included: [
			"Use in one final video, project, or client deliverable",
			"Unlimited views/plays of that one end product",
			"Commercial use permitted",
			"Personal or client work",
		],
		excluded: [
			"Reuse across multiple separate end products",
			"Resale or redistribution of the raw asset file",
			"Inclusion in a template pack, stock library, or NFT",
		],
	},
	{
		name: "Extended License",
		tagline: "For multiple products or resale-adjacent use",
		included: [
			"Everything in the Standard License",
			"Use across multiple end products",
			"Use in products intended for large-scale distribution (broadcast, paid apps)",
			"Priority support",
		],
		excluded: [
			"Reselling or sublicensing the raw, unedited asset file itself",
			"Claiming the original asset as your own for resale as a template",
		],
	},
];

const FAQS = [
	{
		q: "What counts as one 'end product'?",
		a: "A single finished video, motion graphics piece, or project delivered to one client or published to one channel. A wedding video, a YouTube video, or a single ad counts as one end product.",
	},
	{
		q: "Do I need the Extended License for client work?",
		a: "Not necessarily — client work is covered under the Standard License as long as it's a single end product per license purchased. You'd need Extended only if you're reusing the same asset across multiple distinct client projects.",
	},
	{
		q: "Can I edit or modify the assets?",
		a: "Yes. Modifying, recoloring, and combining assets with your own footage is expected and encouraged under both license types.",
	},
	{
		q: "Is attribution required?",
		a: "No. Neither license requires crediting IdiaDesigns, though we always appreciate a tag if you share your work publicly.",
	},
	{
		q: "Can I use one purchase across a full YouTube channel?",
		a: "A Standard License covers one end product. For ongoing use across an entire channel's output, an Extended License is the right fit — reach out if you're unsure which applies.",
	},
];

export default function LicenseInfoPage() {
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
						Licensing
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						What you can{" "}
						<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
							do
						</span>{" "}
						with your purchase
					</h1>
					<p className="mt-5 text-brand-white/50 text-[15px] font-light leading-relaxed max-w-lg mx-auto">
						Every product includes a Standard License. Here's what that covers,
						and when you'd need more.
					</p>
				</div>
			</section>

			{/* License comparison */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6">
					<div className="grid sm:grid-cols-2 gap-6">
						{LICENSES.map(license => (
							<div
								key={license.name}
								className="p-6 sm:p-8 rounded-xl border border-border bg-brand-white">
								<h2 className="font-serif text-xl font-semibold text-brand-navy">
									{license.name}
								</h2>
								<p className="mt-1 text-[13px] text-brand-purple-dark font-medium">
									{license.tagline}
								</p>

								<div className="mt-6 space-y-2.5">
									{license.included.map(item => (
										<div key={item} className="flex gap-2.5 items-start">
											<CheckCircle2 className="w-4 h-4 text-brand-purple-dark flex-shrink-0 mt-0.5" />
											<span className="text-[13px] text-text-secondary/80 font-light leading-relaxed">
												{item}
											</span>
										</div>
									))}
								</div>

								<div className="mt-5 pt-5 border-t border-border-subtle space-y-2.5">
									{license.excluded.map(item => (
										<div key={item} className="flex gap-2.5 items-start">
											<XCircle className="w-4 h-4 text-brand-navy/40 flex-shrink-0 mt-0.5" />
											<span className="text-[13px] text-text-secondary/60 font-light leading-relaxed">
												{item}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<p className="mt-6 text-[12px] text-text-secondary/60 font-light text-center">
						Not sure which license fits your project? Contact us before you buy
						and we'll point you in the right direction.
					</p>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-20 bg-surface-subtle">
				<div className="max-w-2xl mx-auto px-4 sm:px-6">
					<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy text-center mb-12">
						Licensing questions
					</h2>
					<div className="space-y-7">
						{FAQS.map(item => (
							<div key={item.q} className="flex gap-4">
								<HelpCircle className="w-4 h-4 text-brand-purple-dark flex-shrink-0 mt-1" />
								<div>
									<h3 className="text-[14px] font-semibold text-brand-navy">
										{item.q}
									</h3>
									<p className="mt-1.5 text-[13px] text-text-secondary/80 font-light leading-relaxed">
										{item.a}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="py-20">
				<div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
					<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-purple/10 mb-5">
						<Mail className="w-5 h-5 text-brand-purple-dark" />
					</span>
					<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">
						Need a license clarified?
					</h2>
					<p className="mt-3 text-text-secondary/80 text-[14px] font-light">
						Tell us about your project and we'll confirm what's covered.
					</p>
					<a
						href="mailto:support@idiadesigns.com"
						className="mt-7 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple-dark text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple transition-all duration-200">
						Ask a Question
					</a>
				</div>
			</section>
		</div>
	);
}
