export interface MyReview {
	id: string;
	rating: number;
	comment: string | null;
	isApproved: boolean;
	createdAt: string;
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnailUrl: string;
	};
}

// A review as shown publicly on a product's page — only approved reviews
// are ever returned by GET /reviews/product/:productId.
export interface ProductReview {
	id: string;
	rating: number;
	comment: string | null;
	isApproved: boolean;
	createdAt: string;
	user: {
		name: string;
		avatar: string | null;
	};
}

export interface CreateReviewPayload {
	productId: string;
	rating: number;
	comment?: string;
}
