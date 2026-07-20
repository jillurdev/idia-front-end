export type NotifType =
	| "NEW_PRODUCT"
	| "CATEGORY_UPDATE"
	| "PURCHASE_SUCCESS"
	| "REVIEW_APPROVED"
	| "SYSTEM"
	| "PRICE_DROP";

export interface Notification {
	id: string;
	title: string;
	message: string;
	type: NotifType;
	refId: string | null;
	refType: string | null;
	isRead: boolean;
	createdAt: string;
}
