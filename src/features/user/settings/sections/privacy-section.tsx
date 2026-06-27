"use client";

import { useState, useTransition } from "react";
import { Shield, Check, Loader2, Download } from "lucide-react";

export default function PrivacySection() {
	const [showActivity, setShowActivity] = useState(true);
	const [isPending, startTransition] = useTransition();
	const [saved, setSaved] = useState(false);
	const [exporting, setExporting] = useState(false);

	function handleSave() {
		startTransition(async () => {
			await fetch("/api/user/privacy", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ showActivity }),
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		});
	}

	async function handleExport() {
		setExporting(true);
		const res = await fetch("/api/user/export-data");
		const blob = await res.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "my-data.json";
		a.click();
		URL.revokeObjectURL(url);
		setExporting(false);
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Shield className="w-4 h-4 text-[#c8a96e]" />
					<h2 className="text-[15px] font-semibold text-[#0d0d0d]">Privacy</h2>
				</div>
				{saved && (
					<span className="flex items-center gap-1 text-[12px] text-emerald-600 font-medium">
						<Check className="w-3.5 h-3.5" /> Saved
					</span>
				)}
			</div>

			{/* Privacy toggles */}
			<div className="space-y-2">
				<PrivacyRow
					label="Show activity publicly"
					description="Others can see your likes and saves on products"
					checked={showActivity}
					onChange={() => setShowActivity(p => !p)}
				/>
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
				Save
			</button>

			{/* Data export */}
			<div className="pt-4 border-t border-[#eadfce] space-y-2">
				<p className="text-[13px] font-medium text-[#0d0d0d]">
					Export your data
				</p>
				<p className="text-[12px] text-[#9c8e7e]">
					Download a copy of your profile, purchases, reviews, and activity as a
					JSON file.
				</p>
				<button
					onClick={handleExport}
					disabled={exporting}
					className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e4d8c4] text-sm text-[#5c5244] hover:bg-[#f5f0e8] transition-colors disabled:opacity-60">
					{exporting ? (
						<Loader2 className="w-3.5 h-3.5 animate-spin" />
					) : (
						<Download className="w-3.5 h-3.5" />
					)}
					Download my data
				</button>
			</div>
		</div>
	);
}

function PrivacyRow({
	label,
	description,
	checked,
	onChange,
}: {
	label: string;
	description: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-[#eadfce] bg-[#faf7f2]">
			<div className="flex-1">
				<p className="text-[13px] font-medium text-[#0d0d0d]">{label}</p>
				<p className="text-[11px] text-[#9c8e7e]">{description}</p>
			</div>
			<button
				role="switch"
				aria-checked={checked}
				onClick={onChange}
				className={`relative inline-flex w-9 h-5 rounded-full transition-colors duration-200 shrink-0 ${
					checked ? "bg-[#c8a96e]" : "bg-[#e4d8c4]"
				}`}>
				<span
					className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
						checked ? "translate-x-4" : "translate-x-0"
					}`}
				/>
			</button>
		</div>
	);
}
