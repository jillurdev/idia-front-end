"use client";

import { useState } from "react";
import { useEmails } from "@/features/owner/emails/hooks/useEmails";
import { EmailsTable } from "@/features/owner/emails/components/EmailsTable";
import { EmailDetailModal } from "@/features/owner/emails/components/EmailDetailModal";
import { BroadcastEmailModal } from "@/features/owner/emails/components/BroadcastEmailModal";
import { Button } from "@/components/ui/Button";
import type { EmailLog } from "@/features/owner/emails/types";

export default function EmailsPage() {
	const [page] = useState(1);
	const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
	const [composeOpen, setComposeOpen] = useState(false);

	const { data, isLoading } = useEmails({ page, limit: 20 });

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-text-primary">
						Email Logs
					</h1>
					<p className="mt-1 text-sm text-text-muted">
						System থেকে পাঠানো সব broadcast email এর history
					</p>
				</div>
				<Button onClick={() => setComposeOpen(true)}>Compose Broadcast</Button>
			</div>

			<EmailsTable
				emails={data?.data ?? []}
				isLoading={isLoading}
				onViewDetail={setSelectedEmail}
			/>

			<EmailDetailModal
				email={selectedEmail}
				onClose={() => setSelectedEmail(null)}
			/>
			<BroadcastEmailModal
				open={composeOpen}
				onClose={() => setComposeOpen(false)}
			/>
		</div>
	);
}
