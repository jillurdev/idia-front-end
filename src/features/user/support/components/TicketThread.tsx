"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useTicket } from "../hooks/useTicket";
import { useReplyTicket } from "../hooks/useReplyTicket";
import { TicketStatusBadge } from "./TicketStatusBadge";

function formatTime(dateString: string) {
	return new Date(dateString).toLocaleString(undefined, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function TicketThreadClient() {
	const { id } = useParams<{ id: string }>();
	const { data: ticket, isLoading } = useTicket(id);
	const { sendReply, isSending } = useReplyTicket(id);
	const [body, setBody] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!body.trim()) return;
		await sendReply(body.trim());
		setBody("");
	};

	if (isLoading) return <ThreadSkeleton />;
	if (!ticket) return null;

	const closed = ticket.status === "CLOSED";

	return (
		<div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
			<Link
				href="/support"
				className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-brand-navy transition-colors">
				<ArrowLeft className="w-3.5 h-3.5" />
				Back to tickets
			</Link>

			<div className="flex items-start justify-between gap-3">
				<div>
					<h1 className="font-serif text-xl font-semibold text-brand-navy">
						{ticket.subject}
					</h1>
					<p className="text-[12px] text-text-muted mt-1">
						{ticket.ticketNumber}
					</p>
				</div>
				<TicketStatusBadge status={ticket.status} />
			</div>

			<div className="rounded-2xl border border-border bg-surface p-5 space-y-5">
				{ticket.messages.map(m => {
					const fromStaff = m.senderType === "OWNER";
					return (
						<div
							key={m.id}
							className={cn("flex", fromStaff ? "justify-start" : "justify-end")}>
							<div
								className={cn(
									"max-w-[85%] rounded-xl px-4 py-3",
									fromStaff
										? "bg-brand-purple/[0.06] border border-brand-purple/15"
										: "bg-surface-subtle border border-border-subtle",
								)}>
								<p className="text-[11px] font-medium text-text-muted mb-1">
									{fromStaff ? "Support team" : "You"} ·{" "}
									{formatTime(m.createdAt)}
								</p>
								<p className="text-[14px] text-brand-black whitespace-pre-wrap">
									{m.body}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{closed ? (
				<p className="text-[13px] text-text-muted text-center">
					This ticket is closed and no longer accepts new replies.
				</p>
			) : (
				<form onSubmit={handleSubmit} className="flex items-end gap-3">
					<textarea
						value={body}
						onChange={e => setBody(e.target.value)}
						rows={3}
						placeholder="Write a reply..."
						className="flex-1 px-4 py-3 border border-border rounded-xl bg-brand-white text-sm text-brand-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition resize-none"
					/>
					<Button
						type="submit"
						loading={isSending}
						disabled={!body.trim()}
						rightIcon={<Send className="w-3.5 h-3.5" />}>
						Send
					</Button>
				</form>
			)}
		</div>
	);
}

function ThreadSkeleton() {
	return (
		<div className="max-w-2xl mx-auto px-4 py-10 space-y-6 animate-pulse">
			<div className="h-4 w-24 bg-surface-subtle rounded" />
			<div className="h-7 w-2/3 bg-surface-subtle rounded" />
			<div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
				{[1, 2, 3].map(i => (
					<div key={i} className="h-14 w-3/4 bg-surface-subtle rounded-xl" />
				))}
			</div>
		</div>
	);
}
