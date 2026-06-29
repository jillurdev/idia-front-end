export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	icon: string | null;
	coverImage: string | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateCategoryPayload {
	name: string;
	slug: string;
	description?: string;
	icon?: string;
	coverImage?: string;
	isActive?: boolean;
	order?: number;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}
