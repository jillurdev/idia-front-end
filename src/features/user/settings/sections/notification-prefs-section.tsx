"use client";

import { useEffect, useState, useTransition } from "react";
import { Bell, Check, Loader2 } from "lucide-react";

interface NotifPref {
	type: string;
	label: string;
	description: string;
	email: boolean;
	inApp: boolean;
}

const DEFAULT_PREFS: NotifPref[] = [
	{
		type: "NEW_PRODUCT",
		label: "New products",
		description: "When new motion graphics are published",
		email: true,
		inApp: true,
	},
	{
		type: "CATEGORY_UPDATE",
		label: "Category updates",
		description: "When a category you follow gets new content",
		email: false,
		inApp: true,
	},
	{
		type: "PURCHASE_SUCCESS",
		label: "Purchase confirmation",
		description: "Receipt and download link after buying",
		email: true,
		inApp: true,
	},
	{
		type: "PRICE_DROP",
		label: "Price drops",
		description: "When saved items go on sale",
		email: true,
		inApp: true,
	},
	{
		type: "REVIEW_APPROVED",
		label: "Review approved",
		description: "When your review is published",
		email: false,
		inApp: true,
	},
	{
		type: "SYSTEM",
		label: "Announcements",
		description: "Important site news from the team",
		email: true,
		inApp: true,
	},
];

export default function NotificationPrefsSection() {
	const [prefs, setPrefs] = useState<NotifPref[]>(DEFAULT_PREFS);
	const [loading, setLoading] = useState(true);
	const [isPending, startTransition] = useTransition();
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		fetch("/api/user/notification-prefs")
			.then(r => r.json())
			.then(data => {
				if (data.prefs?.length) {
					setPrefs(prev =>
						prev.map(p => {
							const found = data.prefs.find((d: any) => d.type === p.type);
							return found
								? { ...p, email: found.email, inApp: found.inApp }
								: p;
						}),
					);
				}
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	function toggle(type: string, channel: "email" | "inApp") {
		setPrefs(prev =>
			prev.map(p => (p.type === type ? { ...p, [channel]: !p[channel] } : p)),
		);
	}

	function handleSave() {
		startTransition(async () => {
			await fetch("/api/user/notification-prefs", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prefs }),
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		});
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Bell className="w-4 h-4 text-[#c8a96e]" />
					<h2 className="text-[15px] font-semibold text-[#0d0d0d]">
						Notification preferences
					</h2>
				</div>
				{saved && (
					<span className="flex items-center gap-1 text-[12px] text-emerald-600 font-medium">
						<Check className="w-3.5 h-3.5" /> Saved
					</span>
				)}
			</div>

			{/* Channel headers */}
			<div className="flex items-center gap-2 px-1">
				<div className="flex-1" />
				<span className="w-12 text-center text-[10px] font-semibold text-[#9c8e7e] uppercase tracking-wider">
					Email
				</span>
				<span className="w-12 text-center text-[10px] font-semibold text-[#9c8e7e] uppercase tracking-wider">
					In-app
				</span>
			</div>

			{/* Pref rows */}
			<div className="space-y-2">
				{prefs.map(pref => (
					<div
						key={pref.type}
						className="flex items-center gap-2 px-3 py-3 rounded-xl border border-[#eadfce] bg-[#faf7f2]">
						<div className="flex-1 min-w-0">
							<p className="text-[13px] font-medium text-[#0d0d0d]">
								{pref.label}
							</p>
							<p className="text-[11px] text-[#9c8e7e]">{pref.description}</p>
						</div>
						<Toggle
							checked={pref.email}
							onChange={() => toggle(pref.type, "email")}
							label={`${pref.label} email`}
						/>
						<Toggle
							checked={pref.inApp}
							onChange={() => toggle(pref.type, "inApp")}
							label={`${pref.label} in-app`}
						/>
					</div>
				))}
			</div>

			<button
				onClick={handleSave}
				disabled={isPending}
				className="px-5 py-2.5 rounded-xl bg-[#c8a96e] text-[#0d0d0d] text-sm font-medium hover:bg-[#b8996e] transition-colors flex items-center gap-2 disabled:opacity-60">
				{isPending ? (
					<Loader2 className="w-3.5 h-3.5 animate-spin" />
				) : (
					<Check className="w-3.5 h-3.5" />
				)}
				Save preferences
			</button>
		</div>
	);
}

function Toggle({
	checked,
	onChange,
	label,
}: {
	checked: boolean;
	onChange: () => void;
	label: string;
}) {
	return (
		<button
			role="switch"
			aria-checked={checked}
			aria-label={label}
			onClick={onChange}
			className={`w-12 flex justify-center transition-colors`}>
			<span
				className={`relative inline-flex w-9 h-5 rounded-full transition-colors duration-200 ${
					checked ? "bg-[#c8a96e]" : "bg-[#e4d8c4]"
				}`}>
				<span
					className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
						checked ? "translate-x-4" : "translate-x-0"
					}`}
				/>
			</span>
		</button>
	);
}
