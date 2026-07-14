export type SettingGroup = "general" | "payment" | "email";

export interface SiteSetting {
	id: string;
	key: string;
	value: string;
	group: SettingGroup;
	updatedById: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface UpsertSettingPayload {
	key: string;
	value: string;
	group: SettingGroup;
}

// ── Assumed key names per group — confirm against actual backend usage ──
export const SETTING_KEYS = {
	general: {
		siteName: "site_name",
		siteLogo: "site_logo",
		contactEmail: "contact_email",
		contactPhone: "contact_phone",
	},
	payment: {
		lemonSqueezyApiKey: "lemonsqueezy_api_key",
		lemonSqueezyStoreId: "lemonsqueezy_store_id",
		sslcommerzStoreId: "sslcommerz_store_id",
		sslcommerzStorePassword: "sslcommerz_store_password",
		paymentMode: "payment_mode", // "sandbox" | "live"
	},
	email: {
		mailProvider: "mail_provider", // "resend" | "gmail"
		mailFromName: "mail_from_name",
		mailFromEmail: "mail_from_email",
		resendApiKey: "resend_api_key",
	},
} as const;

export interface OwnerProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: string;
	status: string;
	avatar: string | null;	
	createdAt: string;
}

export interface UpdateProfilePayload {
	name: string;
	phone: string;
}

export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}
