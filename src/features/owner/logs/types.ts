export type LogAction =
	| "CREATE"
	| "UPDATE"
	| "DELETE"
	| "PUBLISH"
	| "UNPUBLISH"
	| "LOGIN"
	| "LOGOUT"
	| "EMAIL_SENT"
	| "PURCHASE"
	| "DOWNLOAD"
	| "ROLE_CHANGE"
	| "SETTING_CHANGE";

export interface SiteLog {
	id: string;
	actorId: string;
	action: LogAction;
	entity: string;
	entityId: string | null;
	detail: string | null;
	ipAddress: string | null;
	userAgent: string | null;
	createdAt: string;
	actor: {
		name: string;
		email: string;
	};
}

export interface SiteLogFilters {
	entity?: string;
	actorId?: string;
	action?: LogAction;
	search?: string;
	page: number;
	limit: number;
	[key: string]: string | number | boolean | null | undefined;
}
