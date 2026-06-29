export interface Review {
	id: string;
	userId: string;
	productId: string;
	rating: number;
	comment: string | null;
	isApproved: boolean;
	createdAt: string;
	updatedAt: string;
	user: {
		name: string;
		email: string;
	};
	product: {
		title: string;
	};
}
