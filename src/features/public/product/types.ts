export interface ProductImage {
	id: string;
	url: string;
	altText: string | null;
	order: number;
	isCover: boolean;
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
}

export interface ProductFilters {
	categoryId?: string;
	isFeatured?: boolean;
	[key: string]: string | number | boolean | null | undefined;
}
