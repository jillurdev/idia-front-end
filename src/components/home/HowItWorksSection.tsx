import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { STEPS } from "../data/home";

export default function HowItWorksSection() {
	return (
		<section className="py-24 bg-brand-navy relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-purple/5" />
				<div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-brand-cyan/8" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Simple Process"
					title="How It Works"
					subtitle="From discovery to download — a seamless experience in three steps."
					light
				/>

				<div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
					{STEPS.map((step, i) => (
						<div key={step.number} className="relative">
							{i < STEPS.length - 1 && (
								<div className="hidden md:block absolute top-6 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-[1px] bg-gradient-to-r from-brand-purple/30 to-transparent" />
							)}

							<div className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-brand-purple/30 bg-brand-purple/8 mb-5">
									<span className="font-serif text-brand-cyan text-[15px] font-semibold">
										{step.number}
									</span>
								</div>
								<h3 className="font-serif text-xl font-semibold text-brand-white mb-3">
									{step.title}
								</h3>
								<p className="text-brand-white/40 text-[13px] font-light leading-relaxed">
									{step.desc}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-14 text-center">
					<Link
						href="/register"
						className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-colors duration-200 group">
						Get Started Free
						<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
