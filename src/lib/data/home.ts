 
import {
	CategoryItem,
	ProductItem,
	StatItem,
	StepItem,
	TestimonialItem,
} from "@/types/home";
import { Star, Download, Users, Package } from "lucide-react";
 

export const STATS: StatItem[] = [
	{ label: "Premium Assets", value: "1,200+", icon: Package },
	{ label: "Happy Creators", value: "8,400+", icon: Users },
	{ label: "Downloads", value: "52,000+", icon: Download },
	{ label: "5-Star Reviews", value: "3,100+", icon: Star },
];

export const CATEGORIES: CategoryItem[] = [
	{ name: "After Effects", slug: "after-effects", icon: "🎬", count: 320 },
	{ name: "Motion Graphics", slug: "motion-graphics", icon: "✨", count: 180 },
	{ name: "Premiere Pro", slug: "premiere-pro", icon: "🎞️", count: 240 },
	{ name: "Cinematic LUTs", slug: "luts", icon: "🎨", count: 95 },
	{ name: "Sound FX", slug: "sound-fx", icon: "🔊", count: 140 },
	{ name: "Transitions", slug: "transitions", icon: "⚡", count: 210 },
];

export const FEATURED_PRODUCTS: ProductItem[] = [
	{
		id: "1",
		title: "Epic Logo Reveal",
		slug: "epic-logo-reveal",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
		price: 29,
		category: "After Effects",
		rating: 4.9,
		reviewCount: 142,
		isFeatured: true,
	},
	{
		id: "2",
		title: "Cinematic Title Pack",
		slug: "cinematic-title-pack",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80",
		price: 49,
		category: "Motion Graphics",
		rating: 4.8,
		reviewCount: 98,
		isFeatured: true,
	},
	{
		id: "3",
		title: "Luxury Slide Transitions",
		slug: "luxury-slide-transitions",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80",
		price: 19,
		category: "Transitions",
		rating: 4.7,
		reviewCount: 76,
		isFeatured: true,
	},
	{
		id: "4",
		title: "Neon Glitch Effects",
		slug: "neon-glitch-effects",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80",
		price: 39,
		category: "After Effects",
		rating: 4.9,
		reviewCount: 203,
		isFeatured: true,
	},
];

export const STEPS: StepItem[] = [
	{
		number: "01",
		title: "Browse & Discover",
		desc: "Explore our curated library of premium motion graphics, templates, and digital assets.",
	},
	{
		number: "02",
		title: "Purchase Instantly",
		desc: "Secure checkout in seconds. Your assets are ready immediately after payment.",
	},
	{
		number: "03",
		title: "Download & Create",
		desc: "Download your files and bring your creative vision to life — no subscription needed.",
	},
];

export const TESTIMONIALS: TestimonialItem[] = [
	{
		name: "Rafiul Islam",
		role: "Motion Designer",
		avatar: "R",
		rating: 5,
		text: "The quality here is unmatched. I've purchased templates from many marketplaces — IdiaDesigns is in a league of its own.",
	},
	{
		name: "Nadia Chowdhury",
		role: "Video Editor",
		avatar: "N",
		rating: 5,
		text: "Absolutely stunning assets. The logo reveals saved me hours of work. Will definitely be a regular customer.",
	},
	{
		name: "Arif Hossain",
		role: "Content Creator",
		avatar: "A",
		rating: 5,
		text: "Professional, elegant, and affordable. The cinematic LUTs transformed my footage completely.",
	},
];
