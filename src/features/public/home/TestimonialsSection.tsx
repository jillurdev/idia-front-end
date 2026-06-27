export default function NewsletterSection() {
	return (
		<section className="py-20 bg-surface-subtle border-t border-border">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
				<p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple-dark font-medium mb-4">
					Stay in the loop
				</p>

				<h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-navy">
					New assets, every week
				</h2>

				<p className="mt-3 text-text-secondary/70 text-[14px] font-light leading-relaxed">
					Subscribe and be the first to know about new drops, exclusive
					discounts, and creative inspiration.
				</p>

				<form
					onSubmit={e => e.preventDefault()}
					className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
					<input
						type="email"
						required
						placeholder="your@email.com"
						className="flex-1 px-4 py-3 text-sm font-sans bg-brand-white border border-border rounded-[6px] text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200"
					/>
					<button
						type="submit"
						className="px-6 py-3 bg-brand-purple text-brand-white text-[13px] font-medium tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-colors duration-200 whitespace-nowrap">
						Subscribe
					</button>
				</form>

				<p className="mt-3 text-[11px] text-text-secondary/40">
					No spam, ever. Unsubscribe anytime.
				</p>
			</div>
		</section>
	);
}
