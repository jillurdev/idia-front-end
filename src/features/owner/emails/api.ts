import { httpClient } from "@/services/httpClient";
import type { EmailLog, EmailLogFilters, SendEmailPayload } from "./types";

const BASE_PATH = "/email-logs";

export const emailsApi = {
	getAll: async (filters: EmailLogFilters): Promise<EmailLog[]> => {
		return httpClient.get<EmailLog[]>(BASE_PATH, {
			page: filters.page,
			limit: filters.limit,
		});
	},

	send: async (payload: SendEmailPayload): Promise<EmailLog> => {
		return httpClient.post<EmailLog>(`${BASE_PATH}/send`, payload);
	},
};
