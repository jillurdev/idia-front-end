export interface Purchase {
	id: string;
	pricePaid: number;
	currency: string;
	status: string;
	purchasedAt: string;
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnailUrl: string;
		price: number;
		category: {
			name: string;
		};
	};
}
