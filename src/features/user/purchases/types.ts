export type PurchaseStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentGateway = "LEMONSQUEEZY" | "SSLCOMMERZ";

export interface Purchase {
	id: string;
	pricePaid: number;
	currency: "USD" | "BDT";
	gateway: PaymentGateway;
	status: PurchaseStatus;
	purchasedAt: string;
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnailUrl: string;
	};
}

export interface CheckoutResponse {
	checkoutUrl: string;
}
