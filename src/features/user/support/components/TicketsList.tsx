"use client";

import { useState } from "react";
import Link from "next/link";
import { LifeBuoy, Plus, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/common/Pagination";
import { useMyTickets } from "../hooks/useMyTickets";
import { NewTicketModal } from "./NewTicketModal";
import { TicketStatusBadge } from "./TicketStatusBadge";

function timeAgo(dateString: string) {
	const diffMs = Date.now() - new Date(dateString).getTime();
	const mins = Math.floor(diffMs / 60000);
	if (mins < 1) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs}h ago`;
	const days = Math.floor(hrs / 24);
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days}d ago`;
	return new Date(dateString).toLocaleDateString();
}

export default function SupportTicketsClient() {
	const [page, setPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const { data, isLoading } = useMyTickets(page);

	const tickets = data?.data ?? [];
	const meta = data?.meta;

	return (
		<div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
			<div className="flex items-center gap-3">
				<LifeBuoy className="w-6 h-6 text-brand-purple-dark" />
				<h1 className="font-serif text-2xl font-semibold text-brand-navy tracking-tight">
					Support
				</h1>
				<Button
					size="sm"
					className="ml-auto"
					leftIcon={<Plus className="w-3.5 h-3.5" />}
					onClick={() => setModalOpen(true)}>
					New ticket
				</Button>
			</div>

			{isLoading ? (
				<TicketsSkeleton />
			) : tickets.length === 0 ? (
				<div className="rounded-2xl border border-border bg-surface p-12 text-center space-y-3">
					<MessageSquareText className="w-10 h-10 text-brand-purple/30 mx-auto" />
					<h3 className="text-[15px] font-semibold text-brand-navy">
						No tickets yet
					</h3>
					<p className="text-[13px] text-text-secondary">
						Have a question or ran into an issue? Open a new ticket and we'll
						help you out.
					</p>
				</div>
			) : (
				<div className="rounded-2xl border border-border bg-surface overflow-hidden">
					<div className="divide-y divide-border">
						{tickets.map(t => (
							<Link
								key={t.id}
								href={`/support/${t.id}`}
								className="flex items-center gap-3 px-5 py-4 hover:bg-surface-subtle/40 transition-colors">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<p className="text-[14px] font-semibold text-brand-navy truncate">
											{t.subject}
										</p>
									</div>
									<p className="text-[11px] text-text-muted mt-1">
										{t.ticketNumber} · {timeAgo(t.lastMessageAt)}
									</p>
								</div>
								<TicketStatusBadge status={t.status} />
							</Link>
						))}
					</div>
					{meta && <Pagination meta={meta} onPageChange={setPage} />}
				</div>
			)}

			<NewTicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</div>
	);
}

function TicketsSkeleton() {
	return (
		<div className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden animate-pulse">
			{[1, 2, 3].map(i => (
				<div key={i} className="flex items-center gap-3 px-5 py-4">
					<div className="flex-1 space-y-2">
						<div className="h-4 w-1/2 bg-surface-subtle rounded" />
						<div className="h-3 w-1/3 bg-surface-muted rounded" />
					</div>
					<div className="h-6 w-16 bg-surface-subtle rounded-full" />
				</div>
			))}
		</div>
	);
}
