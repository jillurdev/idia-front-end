export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentGateway = "LEMONSQUEEZY" | "SSLCOMMERZ";
export type Currency = "USD" | "BDT";

export interface Purchase {
	id: string;
	userId: string;
	productId: string;
	uploadedById: string;
	pricePaid: number;
	currency: Currency;
	gateway: PaymentGateway;
	status: PaymentStatus;
	transactionId: string | null;
	gatewayOrderId: string | null;
	purchasedAt: string;
	user: {
		name: string;
		email: string;
	};
	product: {
		title: string;
	};
}
