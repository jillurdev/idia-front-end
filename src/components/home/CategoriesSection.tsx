import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { CATEGORIES } from "../data/home";

export default function CategoriesSection() {
	return (
		<section className="py-24 bg-brand-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader
					eyebrow="Explore"
					title="Browse by Category"
					subtitle="Every asset meticulously organised — find exactly what your project needs."
				/>

				<div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{CATEGORIES.map(({ name, slug, icon, count }) => (
						<Link
							key={slug}
							href={`/categories/${slug}`}
							className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border hover:border-brand-purple/40 hover:shadow-[0_4px_20px_rgba(168,85,247,0.12)] transition-all duration-300 bg-brand-white hover:bg-brand-purple/3">
							<span className="text-3xl transition-transform duration-300 group-hover:scale-110">
								{icon}
							</span>
							<div className="text-center">
								<p className="text-[13px] font-medium text-brand-navy group-hover:text-brand-purple-dark transition-colors">
									{name}
								</p>
								<p className="text-[10px] text-text-secondary/40 mt-0.5">
									{count} assets
								</p>
							</div>
						</Link>
					))}
				</div>

				<div className="mt-10 text-center">
					<Link
						href="/categories"
						className="inline-flex items-center gap-2 text-[13px] text-brand-purple-dark hover:text-brand-purple font-medium transition-colors group">
						View all categories
						<ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
