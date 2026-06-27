export interface SavedItem {
	id: string;
	savedAt: string;
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
