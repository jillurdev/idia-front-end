import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { emailsApi } from "../api";
import type { EmailLog, EmailLogFilters, SendEmailPayload } from "../types";
import { ApiError } from "@/services/httpClient";

export const emailsKeys = {
	all: ["owner", "emails"] as const,
	list: (filters: EmailLogFilters) =>
		[...emailsKeys.all, "list", filters] as const,
};

export function useEmails(filters: EmailLogFilters) {
	return useQuery({
		queryKey: emailsKeys.list(filters),
		queryFn: () => emailsApi.getAll(filters),
		placeholderData: prev => prev,
	});
}

export function useSendEmail() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: SendEmailPayload) => emailsApi.send(payload),
		onSuccess: data => {
			toast.success(`${data.recipientCount} জনকে email পাঠানো হয়েছে`);
			queryClient.invalidateQueries({ queryKey: emailsKeys.all });
		},
		onError: error => {
			const message =
				error instanceof ApiError
					? error.message
					: "Email পাঠাতে সমস্যা হয়েছে";
			toast.error(message);
		},
	});
}

export function useResendBroadcast() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (log: EmailLog) =>
			emailsApi.send({
				subject: log.subject,
				body: log.body,
				recipientType: log.recipientType,
				categoryId: log.categoryId ?? undefined,
			}),
		onSuccess: data => {
			toast.success(`আবার ${data.recipientCount} জনকে পাঠানো হয়েছে`);
			queryClient.invalidateQueries({ queryKey: emailsKeys.all });
		},
		onError: error => {
			const message =
				error instanceof ApiError ? error.message : "Resend করতে সমস্যা হয়েছে";
			toast.error(message);
		},
	});
}
