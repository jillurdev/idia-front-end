export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketSenderType = "USER" | "GUEST" | "OWNER";

export interface TicketMessage {
	id: string;
	ticketId: string;
	senderType: TicketSenderType;
	body: string;
	createdAt: string;
}

export interface SupportTicket {
	id: string;
	ticketNumber: string;
	userId: string | null;
	guestName: string | null;
	guestEmail: string | null;
	subject: string;
	status: TicketStatus;
	createdAt: string;
	updatedAt: string;
	closedAt: string | null;
	lastMessageAt: string;
}

export interface TicketWithMessages extends SupportTicket {
	messages: TicketMessage[];
	user: { name: string; email: string } | null;
	// Present only in the staff (owner/admin) detail view.
	repeatSenderCount?: number;
}

export interface TicketWithUser extends SupportTicket {
	user: { name: string; email: string } | null;
}

export interface CreateTicketPayload {
	subject: string;
	message: string;
}

export interface CreateGuestTicketPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
	website?: string; // honeypot — always leave empty
}
