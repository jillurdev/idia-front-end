export interface ProductImage {
	id: string;
	url: string;
	altText: string | null;
	order: number;
}

export interface Tag {
	id: string;
	name: string;
	slug: string;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	icon: string | null;
	coverImage: string | null;
	isActive: boolean;
	order: number;
}

export interface Product {
	id: string;
	title: string;
	slug: string;
	description: string;
	price: number;
	previewVideoUrl: string | null;
	fileUrl: string;
	thumbnailUrl: string;
	isPublished: boolean;
	isFeatured: boolean;
	viewCount: number;
	categoryId: string;
	createdAt: string;
	category: Category;
	images: ProductImage[];
	tags: { tag: Tag }[];
	_count?: {
		reviews: number;
		purchases: number;
	};
}

export interface ProductFilters {
	categoryId?: string;
	isFeatured?: boolean;
	search?: string;
	tags?: string; // comma-separated slugs
	page: number;
	limit: number;
	[key: string]: string | number | boolean | null | undefined;
}
