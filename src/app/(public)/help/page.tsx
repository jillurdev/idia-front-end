"use client";

import { useState, useMemo } from "react";
import {
	Search,
	Download,
	CreditCard,
	ShieldCheck,
	FileText,
	Mail,
	ChevronDown,
} from "lucide-react";

const CATEGORIES = [
	{ icon: Download, label: "Downloads & Files" },
	{ icon: CreditCard, label: "Orders & Billing" },
	{ icon: ShieldCheck, label: "Licensing" },
	{ icon: FileText, label: "Account" },
];

const FAQS = [
	{
		category: "Downloads & Files",
		q: "Where do I find my downloads after purchase?",
		a: "Every purchase is added to your Library. Go to My Account → Library to access download links for any product you've bought, any time.",
	},
	{
		category: "Downloads & Files",
		q: "My download link isn't working. What now?",
		a: "Download links don't expire, but if a file link breaks or a page times out, refresh from your Library — it regenerates a fresh link automatically. If the problem continues, reach out to support with your order number.",
	},
	{
		category: "Downloads & Files",
		q: "Which apps do your assets work with?",
		a: "Each product page lists compatible software and version requirements under 'Compatibility.' Most templates are built for Adobe Premiere Pro, After Effects, or DaVinci Resolve — check the listing before you buy if you're unsure.",
	},
	{
		category: "Orders & Billing",
		q: "What payment methods do you accept?",
		a: "We accept all major credit and debit cards, along with PayPal. All transactions are processed securely at checkout.",
	},
	{
		category: "Orders & Billing",
		q: "Can I get an invoice for my purchase?",
		a: "Yes. An invoice is emailed automatically after every order, and you can also download it from My Account → Order History.",
	},
	{
		category: "Orders & Billing",
		q: "Do you offer refunds?",
		a: "Refunds are handled case by case for digital goods. See our full Refund Policy for eligibility details and how to request one.",
	},
	{
		category: "Licensing",
		q: "Can I use assets in client or commercial work?",
		a: "Yes, our Standard License covers commercial projects for a single end product. For resale, redistribution, or use across multiple end products, check our License Info page for the Extended License terms.",
	},
	{
		category: "Licensing",
		q: "Do I need to credit IdiaDesigns?",
		a: "No attribution is required for any licensed purchase, though we're always glad when creators tag us in their work.",
	},
	{
		category: "Account",
		q: "How do I reset my password?",
		a: "Go to the login page and select 'Forgot password.' You'll receive a reset link by email within a few minutes.",
	},
	{
		category: "Account",
		q: "Can I change the email on my account?",
		a: "Yes, update it any time from My Account → Settings. You'll need to confirm the new address before it takes effect.",
	},
];

export default function HelpPage() {
	const [query, setQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const filtered = useMemo(() => {
		return FAQS.filter(item => {
			const matchesCategory = activeCategory
				? item.category === activeCategory
				: true;
			const matchesQuery =
				query.trim().length === 0 ||
				item.q.toLowerCase().includes(query.toLowerCase()) ||
				item.a.toLowerCase().includes(query.toLowerCase());
			return matchesCategory && matchesQuery;
		});
	}, [query, activeCategory]);

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
						Support
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						How can we{" "}
						<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
							help
						</span>
						?
					</h1>
					<p className="mt-5 text-brand-white/50 text-[15px] font-light leading-relaxed max-w-lg mx-auto">
						Search our help articles or browse by topic below.
					</p>

					{/* Search */}
					<div className="mt-8 relative max-w-md mx-auto">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/40" />
						<input
							type="text"
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder="Search for an answer..."
							aria-label="Search help articles"
							className="w-full pl-11 pr-4 py-3.5 rounded-full bg-brand-white text-brand-black text-[14px] placeholder:text-brand-black/40 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
						/>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="py-16 bg-surface-subtle">
				<div className="max-w-5xl mx-auto px-4 sm:px-6">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<button
							onClick={() => setActiveCategory(null)}
							className={`col-span-2 sm:col-span-4 sm:hidden text-[12px] font-medium tracking-wide uppercase py-2 rounded-full border transition-colors ${
								activeCategory === null
									? "bg-brand-purple-dark text-brand-white border-brand-purple-dark"
									: "border-border text-text-secondary bg-brand-white"
							}`}>
							All Topics
						</button>
						{CATEGORIES.map(({ icon: Icon, label }) => (
							<button
								key={label}
								onClick={() =>
									setActiveCategory(activeCategory === label ? null : label)
								}
								className={`flex flex-col items-center text-center gap-3 p-5 rounded-xl border transition-all duration-200 ${
									activeCategory === label
										? "border-brand-purple bg-brand-white shadow-[0_4px_24px_rgba(168,85,247,0.12)]"
										: "border-border bg-brand-white hover:border-brand-purple/30"
								}`}>
								<span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-purple/10">
									<Icon className="w-5 h-5 text-brand-purple-dark" />
								</span>
								<span className="text-[13px] font-medium text-brand-navy">
									{label}
								</span>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* FAQ list */}
			<section className="py-20">
				<div className="max-w-2xl mx-auto px-4 sm:px-6">
					<h2 className="font-serif text-2xl font-semibold text-brand-navy mb-8">
						{activeCategory ?? "Frequently Asked Questions"}
					</h2>

					{filtered.length === 0 ? (
						<p className="text-[14px] text-text-secondary/70 font-light">
							No articles match your search. Try a different term, or{" "}
							<a
								href="mailto:support@idiadesigns.com"
								className="text-brand-purple-dark underline underline-offset-2">
								contact support
							</a>{" "}
							directly.
						</p>
					) : (
						<div className="divide-y divide-border-subtle">
							{filtered.map((item, i) => {
								const isOpen = openIndex === i;
								return (
									<div key={item.q} className="py-5">
										<button
											onClick={() => setOpenIndex(isOpen ? null : i)}
											aria-expanded={isOpen}
											className="w-full flex items-center justify-between gap-4 text-left">
											<span className="text-[15px] font-medium text-brand-navy">
												{item.q}
											</span>
											<ChevronDown
												className={`w-4 h-4 flex-shrink-0 text-brand-purple-dark transition-transform duration-200 ${
													isOpen ? "rotate-180" : ""
												}`}
											/>
										</button>
										{isOpen && (
											<p className="mt-3 text-[14px] text-text-secondary/80 font-light leading-relaxed max-w-xl">
												{item.a}
											</p>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</section>

			{/* Contact CTA */}
			<section className="py-20 bg-surface-subtle">
				<div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
					<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-purple/10 mb-5">
						<Mail className="w-5 h-5 text-brand-purple-dark" />
					</span>
					<h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">
						Still need a hand?
					</h2>
					<p className="mt-3 text-text-secondary/80 text-[14px] font-light">
						Our support team replies within one business day.
					</p>
					<a
						href="mailto:support@idiadesigns.com"
						className="mt-7 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple-dark text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple transition-all duration-200">
						Contact Support
					</a>
				</div>
			</section>
		</div>
	);
}
