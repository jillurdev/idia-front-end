"use client";

import { useState } from "react";
import {
	Mail,
	MapPin,
	Clock,
	Send,
	MessageCircle,
	CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useCreateGuestTicket } from "@/features/public/support/hooks/useCreateGuestTicket";
import { ApiError } from "@/services/httpClient";

const CONTACT_INFO = [
	{
		icon: Mail,
		label: "Email",
		value: "hello@idiadesigns.com",
		href: "mailto:hello@idiadesigns.com",
	},
	{
		icon: MessageCircle,
		label: "WhatsApp",
		value: "+880 1700-000000",
		href: "https://wa.me/8801700000000",
	},
	{ icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
	{ icon: MapPin, label: "Based in", value: "Dhaka, Bangladesh", href: null },
];

export default function ContactClient() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
		website: "", // honeypot — stays empty for real users, hidden via CSS
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [ticketNumber, setTicketNumber] = useState<string | null>(null);
	const { submit, isSubmitting } = useCreateGuestTicket();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		try {
			const res = await submit(form);
			setTicketNumber(res.data.ticketNumber);
			toast.success("Your message has been sent!");
			setForm({ name: "", email: "", subject: "", message: "", website: "" });
		} catch (err) {
			const message =
				err instanceof ApiError
					? err.message
					: "Something went wrong. Please try again.";
			setErrorMessage(message);
			toast.error(message);
		}
	};

	// Once a ticket has been created, swap the form out for a confirmation
	// panel instead of just disabling it — clearer end state, and the
	// person can't accidentally double-submit.
	const submitted = !!ticketNumber;

	return (
		<div className="bg-brand-white">
			{/* Hero */}
			<section className="relative bg-brand-navy py-24 overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-purple/5" />
				</div>
				<div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
					<p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan/70 font-medium mb-4">
						Get in Touch
					</p>
					<h1 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-white leading-tight">
						Let's start a conversation
					</h1>
					<p className="mt-4 text-brand-white/50 text-[15px] font-light leading-relaxed">
						Questions about a product, a license, or a custom request? We'd love
						to hear from you.
					</p>
				</div>
			</section>

			{/* Form + Info */}
			<section className="py-24">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
					{/* Form */}
					<div className="lg:col-span-3">
						{submitted ? (
							<div className="flex flex-col items-center justify-center text-center h-full rounded-xl border border-brand-cyan/20 bg-gradient-brand-soft px-8 py-16">
								<CheckCircle2 className="w-12 h-12 text-brand-cyan-dark mb-4" />
								<h2 className="font-serif text-2xl font-semibold text-brand-navy">
									Message sent!
								</h2>
								<p className="mt-3 text-[14px] text-brand-navy/70 max-w-sm">
									Thanks for reaching out — ticket{" "}
									<span className="font-semibold">{ticketNumber}</span>. We'll
									reply to your email soon.
								</p>
								<button
									type="button"
									onClick={() => setTicketNumber(null)}
									className="mt-6 text-[13px] font-semibold tracking-wide uppercase text-brand-purple hover:text-brand-purple-dark transition-colors">
									Send another message
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-[12px] font-medium text-brand-navy mb-1.5">
											Your Name
										</label>
										<input
											type="text"
											name="name"
											required
											value={form.name}
											onChange={handleChange}
											placeholder="John Doe"
											className="w-full px-4 py-3 text-sm bg-brand-white border border-border rounded-[6px] text-black placeholder:text-text-secondary/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200"
										/>
									</div>
									<div>
										<label className="block text-[12px] font-medium text-brand-navy mb-1.5">
											Email Address
										</label>
										<input
											type="email"
											name="email"
											required
											value={form.email}
											onChange={handleChange}
											placeholder="you@example.com"
											className="w-full px-4 py-3 text-sm bg-brand-white border border-border rounded-[6px] text-black placeholder:text-secondary/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200"
										/>
									</div>
								</div>

								<div>
									<label className="block text-[12px] font-medium text-brand-navy mb-1.5">
										Subject
									</label>
									<input
										type="text"
										name="subject"
										required
										minLength={3}
										value={form.subject}
										onChange={handleChange}
										placeholder="What's this about?"
										className="w-full px-4 py-3 text-sm bg-brand-white border border-border rounded-[6px] text-black placeholder:text-text-secondary/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200"
									/>
								</div>

								<div>
									<label className="block text-[12px] font-medium text-brand-navy mb-1.5">
										Message
									</label>
									<textarea
										name="message"
										required
										minLength={5}
										rows={6}
										value={form.message}
										onChange={handleChange}
										placeholder="Tell us how we can help..."
										className="w-full px-4 py-3 text-sm   border border-border rounded-[6px]  text-black placeholder:text-text-secondary/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200 resize-none"
									/>
								</div>

								{/* Honeypot field — hidden from real users, bots tend to fill every input */}
								<input
									type="text"
									name="website"
									value={form.website}
									onChange={handleChange}
									tabIndex={-1}
									autoComplete="off"
									className="hidden"
									aria-hidden="true"
								/>

								<button
									type="submit"
									disabled={isSubmitting}
									className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
									{isSubmitting ? "Sending..." : "Send Message"}
									<Send className="w-3.5 h-3.5" />
								</button>

								{errorMessage && (
									<p className="text-[13px] text-red-500 font-medium">
										{errorMessage}
									</p>
								)}
							</form>
						)}
					</div>

					{/* Info */}
					<div className="lg:col-span-2 space-y-4">
						{CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
							const content = (
								<div className="flex items-start gap-4 p-5 rounded-xl border border-brand-purple/20 bg-brand-navy hover:border-brand-cyan/40 transition-colors duration-200">
									<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple/15 flex-shrink-0">
										<Icon className="w-4 h-4 text-brand-cyan" />
									</div>
									<div>
										<p className="text-[11px] uppercase tracking-wide text-brand-white/40 font-medium">
											{label}
										</p>
										<p className="text-[14px] text-brand-white font-medium mt-0.5">
											{value}
										</p>
									</div>
								</div>
							);

							return href ? (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="block">
									{content}
								</a>
							) : (
								<div key={label}>{content}</div>
							);
						})}

						<div className="p-5 rounded-xl bg-gradient-brand-soft border border-brand-purple/20">
							<p className="text-[13px] text-brand-navy/80 font-light leading-relaxed">
								Looking for licensing details or bulk purchase options? Mention
								it in your message and we'll follow up with everything you need.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
