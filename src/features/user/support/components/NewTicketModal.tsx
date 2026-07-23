"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useCreateTicket } from "../hooks/useCreateTicket";
import { useRouter } from "next/navigation";

export function NewTicketModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const { createTicket, isCreating } = useCreateTicket();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await createTicket({ subject, message });
		setSubject("");
		setMessage("");
		onClose();
		router.push(`/support/${res.data.id}`);
	};

	return (
		<Modal open={open} onClose={onClose} title="New support ticket" size="md">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-1.5">
					<label className="text-sm font-medium text-brand-navy">Subject</label>
					<input
						type="text"
						required
						minLength={3}
						value={subject}
						onChange={e => setSubject(e.target.value)}
						placeholder="What do you need help with?"
						className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
					/>
				</div>

				<div className="space-y-1.5">
					<label className="text-sm font-medium text-brand-navy">Message</label>
					<textarea
						required
						minLength={5}
						rows={5}
						value={message}
						onChange={e => setMessage(e.target.value)}
						placeholder="Describe your issue in detail..."
						className="w-full px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition resize-none"
					/>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button type="button" variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" loading={isCreating} loadingText="Submitting...">
						Submit ticket
					</Button>
				</div>
			</form>
		</Modal>
	);
}
