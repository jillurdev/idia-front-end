import { STATS } from "../data/home";

export default function StatsSection() {
	return (
		<section className="bg-brand-white py-16 border-b border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{STATS.map(({ label, value, icon: Icon }) => (
						<div key={label} className="text-center group">
							<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple/10 mb-3 group-hover:bg-brand-purple/20 transition-colors duration-200">
								<Icon className="w-4 h-4 text-brand-purple-dark" />
							</div>
							<p className="font-serif text-3xl font-semibold text-brand-navy">
								{value}
							</p>
							<p className="text-[12px] text-text-secondary/60 mt-1 tracking-wide font-light">
								{label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
