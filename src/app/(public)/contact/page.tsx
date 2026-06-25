"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

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

export default function ContactPage() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
		"idle",
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("sending");
		try {
			// TODO: replace with real backend endpoint once available, e.g.
			// await apiClient.post("/contact", form);
			await new Promise(resolve => setTimeout(resolve, 800));
			setStatus("sent");
			setForm({ name: "", email: "", message: "" });
		} catch {
			setStatus("error");
		}
	};

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
									Message
								</label>
								<textarea
									name="message"
									required
									rows={6}
									value={form.message}
									onChange={handleChange}
									placeholder="Tell us how we can help..."
									className="w-full px-4 py-3 text-sm   border border-border rounded-[6px]  text-black placeholder:text-text-secondary/30 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 transition-all duration-200 resize-none"
								/>
							</div>

							<button
								type="submit"
								disabled={status === "sending"}
								className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-purple text-brand-white text-[13px] font-semibold tracking-widest uppercase rounded-[6px] hover:bg-brand-purple-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
								{status === "sending" ? "Sending..." : "Send Message"}
								<Send className="w-3.5 h-3.5" />
							</button>

							{status === "sent" && (
								<p className="text-[13px] text-brand-cyan-dark font-medium">
									Thanks! Your message has been sent — we'll get back to you
									soon.
								</p>
							)}
							{status === "error" && (
								<p className="text-[13px] text-red-500 font-medium">
									Something went wrong. Please try again.
								</p>
							)}
						</form>
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
