"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Send, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useTicket } from "@/features/user/support/hooks/useTicket";
import { useReplyTicket } from "@/features/user/support/hooks/useReplyTicket";
import { TicketStatusBadge } from "@/features/user/support/components/TicketStatusBadge";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import type { TicketStatus } from "@/features/user/support/types";

const STATUS_OPTIONS: TicketStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

function formatTime(dateString: string) {
	return new Date(dateString).toLocaleString(undefined, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function OwnerTicketDetail() {
	const { id } = useParams<{ id: string }>();
	const { data: ticket, isLoading } = useTicket(id);
	const { sendReply, isSending } = useReplyTicket(id);
	const { updateStatus, isUpdating } = useUpdateTicketStatus(id);
	const [body, setBody] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!body.trim()) return;
		await sendReply(body.trim());
		setBody("");
	};

	if (isLoading) {
		return <div className="p-8 text-center text-sm text-text-muted">Loading ticket…</div>;
	}
	if (!ticket) return null;

	const senderName = ticket.user?.name ?? ticket.guestName ?? "Unknown";
	const senderEmail = ticket.user?.email ?? ticket.guestEmail;
	const closed = ticket.status === "CLOSED";

	return (
		<div className="max-w-3xl space-y-6">
			<Link
				href="/owner/support"
				className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-text-primary transition-colors">
				<ArrowLeft className="w-3.5 h-3.5" />
				Back to tickets
			</Link>

			<div className="flex items-start justify-between gap-3">
				<div>
					<h1 className="text-xl font-semibold text-text-primary">
						{ticket.subject}
					</h1>
					<p className="text-[13px] text-text-muted mt-1">
						{ticket.ticketNumber} · {senderName} ({senderEmail})
						{!ticket.userId && (
							<span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-surface-muted text-text-muted">
								Guest
							</span>
						)}
					</p>
					{typeof ticket.repeatSenderCount === "number" &&
						ticket.repeatSenderCount > 0 && (
							<p className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-brand-purple-dark bg-brand-purple/10 px-2 py-0.5 rounded-full">
								<History className="w-3 h-3" />
								{ticket.repeatSenderCount + 1}
								{ticket.repeatSenderCount === 1 ? "nd" : "th"} ticket from this
								sender
							</p>
						)}
				</div>

				<div className="flex items-center gap-2">
					<TicketStatusBadge status={ticket.status} />
					<select
						value={ticket.status}
						disabled={isUpdating}
						onChange={e => updateStatus(e.target.value as TicketStatus)}
						className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-glow disabled:opacity-60">
						{STATUS_OPTIONS.map(s => (
							<option key={s} value={s}>
								{s.replace("_", " ")}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="rounded-lg border border-border bg-surface p-5 space-y-5">
				{ticket.messages.map(m => {
					const fromCustomer = m.senderType !== "OWNER";
					return (
						<div
							key={m.id}
							className={cn("flex", fromCustomer ? "justify-start" : "justify-end")}>
							<div
								className={cn(
									"max-w-[85%] rounded-xl px-4 py-3",
									fromCustomer
										? "bg-surface-subtle border border-border-subtle"
										: "bg-brand-purple/[0.06] border border-brand-purple/15",
								)}>
								<p className="text-[11px] font-medium text-text-muted mb-1">
									{fromCustomer ? senderName : "You (staff)"} ·{" "}
									{formatTime(m.createdAt)}
								</p>
								<p className="text-[14px] text-text-primary whitespace-pre-wrap">
									{m.body}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{closed ? (
				<p className="text-[13px] text-text-muted text-center">
					This ticket is closed. Reopen it (change status) to reply.
				</p>
			) : (
				<form onSubmit={handleSubmit} className="flex items-end gap-3">
					<textarea
						value={body}
						onChange={e => setBody(e.target.value)}
						rows={3}
						placeholder="Write a reply…"
						className="flex-1 px-4 py-3 border border-border rounded-lg bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-glow transition resize-none"
					/>
					<Button
						type="submit"
						loading={isSending}
						disabled={!body.trim()}
						rightIcon={<Send className="w-3.5 h-3.5" />}>
						Reply
					</Button>
				</form>
			)}
		</div>
	);
}
