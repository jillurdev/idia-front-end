"use client";
import Link from "next/link";
import {
	Instagram,
	Youtube,
	Twitter,
	Facebook,
	Send,
	ArrowUpRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
	Explore: [
		{ label: "Browse All", href: "/products" },
		{ label: "Categories", href: "/categories" },
		{ label: "Featured", href: "/products?featured=true" },
		{ label: "New Arrivals", href: "/products?sort=newest" },
	],
	Company: [
		{ label: "About Us", href: "/about" },
		{ label: "Contact", href: "/contact" },
		{ label: "Blog", href: "/blog" },
	],
	Support: [
		{ label: "Help Center", href: "/help" },
		{ label: "License Info", href: "/license" },
		{ label: "Refund Policy", href: "/refunds" },
		{ label: "Privacy Policy", href: "/privacy" },
		{ label: "Terms of Service", href: "/terms" },
	],
};

const SOCIALS = [
	{ icon: Instagram, label: "Instagram", href: "https://instagram.com" },
	{ icon: Youtube, label: "YouTube", href: "https://youtube.com" },
	{ icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
	{ icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
	return (
		<footer className="bg-brand-navy text-brand-white relative overflow-hidden">
			{/* Decorative top border */}
			<div className="h-[1px] bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

			{/* Background concentric ornament */}
			<div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] rounded-full border border-brand-purple/5 pointer-events-none" />
			<div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[340px] h-[340px] rounded-full border border-brand-purple/5 pointer-events-none" />

			{/* ── Main grid ── */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
					{/* ── Brand column ── */}
					<div className="space-y-6">
						<div>
							<Link href="/" className="inline-block group">
								<h2 className="font-serif text-[28px] font-semibold text-brand-white tracking-tight leading-none group-hover:text-brand-purple transition-colors duration-200">
									Idia<span className="text-brand-purple">Designs</span>
								</h2>
							</Link>
							<div className="mt-1 flex items-center gap-2">
								<div className="h-[1px] w-8 bg-brand-purple/40" />
								<p className="font-serif italic text-brand-purple/80 text-[12px] tracking-wide">
									Where elegance meets excellence
								</p>
							</div>
						</div>

						<p className="text-brand-white/40 text-[13px] font-light leading-relaxed max-w-[260px]">
							Premium motion graphics, templates, and digital assets — crafted
							for creators who demand the finest.
						</p>

						{/* Socials */}
						<div>
							<p className="text-[10px] tracking-[0.2em] uppercase text-brand-white/30 font-medium mb-3">
								Follow us
							</p>
							<div className="flex items-center gap-2">
								{SOCIALS.map(({ icon: Icon, label, href }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="w-9 h-9 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 hover:border-brand-purple/50 hover:text-brand-purple transition-all duration-200">
										<Icon className="w-4 h-4" />
									</a>
								))}
							</div>
						</div>

						{/* Newsletter */}
						<div>
							<p className="text-[10px] tracking-[0.2em] uppercase text-brand-white/30 font-medium mb-3">
								Stay updated
							</p>
							<NewsletterInput />
						</div>
					</div>

					{/* ── Link columns ── */}
					{Object.entries(FOOTER_LINKS).map(([title, links]) => (
						<div key={title}>
							<p className="text-[10px] tracking-[0.2em] uppercase text-brand-purple/70 font-medium mb-5">
								{title}
							</p>
							<ul className="space-y-3">
								{links.map(({ label, href }) => (
									<li key={href}>
										<Link
											href={href}
											className="group flex items-center gap-1 text-[13px] text-brand-white/45 hover:text-brand-white transition-colors duration-200">
											<span>{label}</span>
											<ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* ── Bottom bar ── */}
				<div className="mt-14 pt-6 border-t border-brand-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-[11px] text-brand-white/25 font-light">
						© {new Date().getFullYear()} IdiaDesigns. All rights reserved.
					</p>

					{/* Ornamental center mark */}
					<div className="hidden sm:flex items-center gap-3 text-brand-purple/30 text-[9px]">
						<div className="h-[1px] w-12 bg-brand-purple/15" />
						✦
						<div className="h-[1px] w-12 bg-brand-purple/15" />
					</div>

					<div className="flex items-center gap-4">
						<Link
							href="/privacy"
							className="text-[11px] text-brand-white/25 hover:text-brand-white/50 transition-colors">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="text-[11px] text-brand-white/25 hover:text-brand-white/50 transition-colors">
							Terms
						</Link>
						<Link
							href="/license"
							className="text-[11px] text-brand-white/25 hover:text-brand-white/50 transition-colors">
							License
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

// ─── Newsletter input ─────────────────────────────────────────────────────────
function NewsletterInput() {
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				// TODO: connect to email subscription API
				const form = e.target as HTMLFormElement;
				const email = (form.elements.namedItem("nl-email") as HTMLInputElement)
					.value;
				console.log("Newsletter subscribe:", email);
				form.reset();
			}}
			className="flex items-center gap-0 group">
			<input
				name="nl-email"
				type="email"
				required
				placeholder="your@email.com"
				className="
          flex-1 min-w-0 px-3.5 py-2.5 text-[12px] font-sans
          bg-brand-white/5 border border-brand-white/10
          text-brand-white placeholder:text-brand-white/20
          rounded-l-[6px] outline-none
          focus:border-brand-purple/40 focus:bg-brand-white/8
          transition-all duration-200
        "
			/>
			<button
				type="submit"
				aria-label="Subscribe"
				className="
          px-3.5 py-2.5 bg-brand-purple text-brand-navy
          rounded-r-[6px] hover:bg-brand-purple/90
          transition-colors duration-200 flex-shrink-0
        ">
				<Send className="w-3.5 h-3.5" />
			</button>
		</form>
	);
}
