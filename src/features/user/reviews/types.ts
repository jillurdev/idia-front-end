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
