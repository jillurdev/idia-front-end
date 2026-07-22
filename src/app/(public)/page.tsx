"use client";

import {
	HeroSection,
	StatsSection,
	FeaturedSection,
	FeaturedProductsSection,
	HowItWorksSection,
	TestimonialsSection,
	NewsletterSection,
} from "@/features/public/home";

export default function HomePage() {
	return (
		<div className="bg-brand-white">
			<HeroSection />
			<StatsSection />
			<FeaturedSection />
			<FeaturedProductsSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<NewsletterSection />
		</div>
	);
}
