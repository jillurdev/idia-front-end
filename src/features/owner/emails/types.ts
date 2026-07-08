export type RecipientType =
	| "SINGLE"
	| "CUSTOM"
	| "ALL"
	| "CUSTOMERS"
	| "NON_CUSTOMERS"
	| "SPECIFIC_CATEGORY";

export interface EmailLog {
	id: string;
	sentById: string;
	sentBy: {
		name: string;
	};
	subject: string;
	body: string;
	recipientType: RecipientType;
	categoryId: string | null;
	recipientCount: number;
	sentAt: string;
}

export interface EmailLogFilters {
	page?: number;
	limit?: number;
}

export interface SendEmailPayload {
	subject: string;
	body: string;
	recipientType: RecipientType;
	categoryId?: string;
	userIds?: string[];
}
