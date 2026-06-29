import type { Category } from "../categories/types";
import type { Tag } from "../tags/types";

export interface ProductImage {
	id: string;
	productId: string;
	url: string;
	altText: string | null;
	order: number;
	isCover: boolean;
	createdAt: string;
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
	uploadedById: string;
	createdAt: string;
	updatedAt: string;
	category: Category;
	images: ProductImage[];
	tags: { tag: Tag }[];
}

export interface CreateProductPayload {
	title: string;
	slug: string;
	description: string;
	price: number;
	categoryId: string;
	fileUrl: string;
	thumbnailUrl: string;
	previewVideoUrl?: string;
	isPublished?: boolean;
	isFeatured?: boolean;
	tagIds?: string[];
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface AddImagePayload {
	url: string;
	altText?: string;
	order?: number;
	isCover?: boolean;
}
