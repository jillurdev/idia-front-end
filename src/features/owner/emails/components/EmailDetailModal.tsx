"use client";

import { Modal } from "@/components/ui/Modal";
import type { EmailLog } from "../types";
import { RecipientTypeBadge } from "./EmailStatusBadge";

interface Props {
	email: EmailLog | null;
	onClose: () => void;
}

export function EmailDetailModal({ email, onClose }: Props) {
	return (
		<Modal open={!!email} onClose={onClose} title="Email Details" size="lg">
			{email && (
				<div className="space-y-4 text-sm">
					<div className="flex items-center justify-between">
						<span className="text-text-muted">Recipients</span>
						<div className="flex items-center gap-2">
							<RecipientTypeBadge type={email.recipientType} />
							<span className="text-text-muted">
								({email.recipientCount} জন)
							</span>
						</div>
					</div>
					<div className="flex justify-between">
						<span className="text-text-muted">Subject</span>
						<span className="text-text-primary">{email.subject}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-text-muted">Sent By</span>
						<span className="text-text-primary">{email.sentBy.name}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-text-muted">Sent At</span>
						<span className="text-text-primary">
							{new Date(email.sentAt).toLocaleString("en-GB")}
						</span>
					</div>
					<div>
						<p className="mb-1.5 text-text-muted">Message</p>
						<div
							className="rounded-md border border-border bg-surface-subtle p-3 text-text-primary"
							dangerouslySetInnerHTML={{ __html: email.body }}
						/>
					</div>
				</div>
			)}
		</Modal>
	);
}
