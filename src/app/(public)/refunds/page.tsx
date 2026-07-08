import { CheckCircle2, XCircle, Clock, Mail } from "lucide-react";

const ELIGIBLE = [
	"The file is corrupted, incomplete, or fails to open in the listed compatible software.",
	"You were charged more than once for the same order.",
	"The product delivered is materially different from its listing (wrong file, wrong version, missing assets shown in the preview).",
];

const NOT_ELIGIBLE = [
	"You've downloaded the files and simply changed your mind.",
	"You didn't check compatibility requirements before purchase.",
	"The request is made more than 14 days after purchase.",
	"The license has already been used in a published or delivered project.",
];

const STEPS = [
	{
		title: "Contact support",
		desc: "Email support@idiadesigns.com with your order number and a description of the issue.",
	},
	{
		title: "We review your request",
		desc: "Our team checks the order and issue against the eligibility criteria, usually within 2 business days.",
	},
	{
		title: "Refund or resolution",
		desc: "If approved, refunds are issued to your original payment method within 5–10 business days. If we can resolve the issue with a fixed file or replacement instead, we'll offer that first.",
	},
];

export default function RefundPolicyPage() {
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
						Policy
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Refund Policy
					</h1>
					<p className="mt-5 text-brand-white/50 text-[15px] font-light leading-relaxed max-w-lg mx-auto">
						Because our products are digital and delivered instantly, refunds
						are handled a little differently than physical goods. Here's exactly
						how it works.
					</p>
				</div>
			</section>

			{/* Overview */}
			<section className="py-20">
				<div className="max-w-2xl mx-auto px-4 sm:px-6">
					<p className="text-[15px] text-text-secondary/80 font-light leading-relaxed">
						All purchases on IdiaDesigns are for digital, downloadable products.
						Once a file is downloaded, it can be copied and reused indefinitely,
						which is why we can't offer refunds simply for a change of mind.
						That said, if something is genuinely wrong with your order, we want
						to make it right.
					</p>
				</div>
			</section>

			{/* Eligibility */}
			<section className="py-20 bg-surface-subtle">
				<div className="max-w-4xl mx-auto px-4 sm:px-6">
					<div className="grid sm:grid-cols-2 gap-6">
						<div className="p-6 sm:p-7 rounded-xl border border-border bg-brand-white">
							<div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-purple/10 mb-4">
								<CheckCircle2 className="w-5 h-5 text-brand-purple-dark" />
							</div>
							<h2 className="font-serif text-lg font-semibold text-brand-navy mb-4">
								Eligible for a refund
							</h2>
							<ul className="space-y-3">
								{ELIGIBLE.map(item => (
									<li
										key={item}
										className="text-[13px] text-text-secondary/80 font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-purple-dark">
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="p-6 sm:p-7 rounded-xl border border-border bg-brand-white">
							<div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-navy/5 mb-4">
								<XCircle className="w-5 h-5 text-brand-navy/70" />
							</div>
							<h2 className="font-serif text-lg font-semibold text-brand-navy mb-4">
								Not eligible
							</h2>
							<ul className="space-y-3">
								{NOT_ELIGIBLE.map(item => (
									<li
										key={item}
										className="text-[13px] text-text-secondary/80 font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-navy/40">
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>

					<p className="mt-6 text-[12px] text-text-secondary/60 font-light text-center">
						Refund requests are reviewed individually — if your situation
						doesn't fit neatly into either list, reach out anyway.
					</p>
				</div>
			</section>

			{/* Process */}
			<section className="py-20">
				<div className="max-w-2xl mx-auto px-4 sm:px-6">
					<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy text-center mb-12">
						How to request a refund
					</h2>
					<div className="space-y-8">
						{STEPS.map((step, i) => (
							<div key={step.title} className="flex gap-5">
								<span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-purple/10 flex items-center justify-center text-[13px] font-semibold text-brand-purple-dark">
									{i + 1}
								</span>
								<div>
									<h3 className="text-[15px] font-semibold text-brand-navy">
										{step.title}
									</h3>
									<p className="mt-1.5 text-[13px] text-text-secondary/80 font-light leading-relaxed">
										{step.desc}
									</p>
								</div>
							</div>
						))}
					</div>
					<p className="mt-10 flex items-center gap-2 text-[12px] text-text-secondary/60 font-light justify-center">
						<Clock className="w-3.5 h-3.5" />
						Refund requests must be submitted within 14 days of purchase.
					</p>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="py-20 bg-surface-subtle">
				<div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
					<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-purple/10 mb-5">
						<Mail className="w-5 h-5 text-brand-purple-dark" />
					</span>
					<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">
						Have an issue with an order?
					</h2>
					<p className="mt-3 text-text-secondary/80 text-[14px] font-light">
						Send us your order number and we'll take it from there.
					</p>
					<a
						href="mailto:support@idiadesigns.com"
						className="mt-7 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple-dark text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple transition-all duration-200">
						Email Support
					</a>
				</div>
			</section>
		</div>
	);
}
