"use client";

import { Button } from "@/components/ui/Button";
import { useResendBroadcast } from "../hooks/useEmails";
import type { EmailLog } from "../types";
import { RecipientTypeBadge } from "./EmailStatusBadge";

interface Props {
	emails: EmailLog[];
	isLoading: boolean;
	onViewDetail: (email: EmailLog) => void;
}

const resendableTypes = [
	"ALL",
	"CUSTOMERS",
	"NON_CUSTOMERS",
	"SPECIFIC_CATEGORY",
];

export function EmailsTable({ emails, isLoading, onViewDetail }: Props) {
	const resendMutation = useResendBroadcast();

	if (isLoading) {
		return <div className="p-8 text-center text-text-muted">Loading...</div>;
	}

	if (emails.length === 0) {
		return (
			<div className="p-8 text-center text-text-muted">
				কোনো email log পাওয়া যায়নি
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-lg border border-border bg-surface">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-subtle text-left text-text-secondary">
						<th className="px-4 py-3 font-medium">Subject</th>
						<th className="px-4 py-3 font-medium">Recipients</th>
						<th className="px-4 py-3 font-medium">Sent By</th>
						<th className="px-4 py-3 font-medium">Sent At</th>
						<th className="px-4 py-3 font-medium text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{emails.map(email => (
						<tr
							key={email.id}
							className="border-b border-border-subtle last:border-0 hover:bg-surface-subtle">
							<td className="px-4 py-3 text-text-primary">{email.subject}</td>
							<td className="px-4 py-3">
								<div className="flex items-center gap-2">
									<RecipientTypeBadge type={email.recipientType} />
									<span className="text-text-muted">
										({email.recipientCount})
									</span>
								</div>
							</td>
							<td className="px-4 py-3 text-text-muted">{email.sentBy.name}</td>
							<td className="px-4 py-3 text-text-muted">
								{new Date(email.sentAt).toLocaleString("en-GB")}
							</td>
							<td className="px-4 py-3 text-right">
								<div className="flex justify-end gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onViewDetail(email)}>
										View
									</Button>
									{resendableTypes.includes(email.recipientType) && (
										<Button
											variant="outline"
											size="sm"
											loading={resendMutation.isPending}
											onClick={() => resendMutation.mutate(email)}>
											Resend
										</Button>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
