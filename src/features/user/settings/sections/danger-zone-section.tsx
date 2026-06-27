"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DangerZoneSection() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [step, setStep] = useState<"idle" | "confirm" | "typing">("idle");
	const [confirmText, setConfirmText] = useState("");
	const [isPending, startTransition] = useTransition();

	const CONFIRM_PHRASE = "delete my account";
	const canDelete = confirmText.toLowerCase() === CONFIRM_PHRASE;

	function handleDelete() {
		if (!canDelete) return;
		startTransition(async () => {
			await fetch("/api/user/account", { method: "DELETE" });
			await logout();
			router.push("/");
		});
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-2">
				<AlertTriangle className="w-4 h-4 text-red-500" />
				<h2 className="text-[15px] font-semibold text-[#0d0d0d]">
					Danger zone
				</h2>
			</div>

			<div className="p-4 rounded-xl border border-red-100 bg-red-50/50 space-y-3">
				<div>
					<p className="text-[13px] font-semibold text-red-700">
						Delete account
					</p>
					<p className="text-[12px] text-red-500 mt-0.5">
						This will permanently delete your account, purchases, reviews, and
						all saved data. This cannot be undone.
					</p>
				</div>

				{step === "idle" && (
					<button
						onClick={() => setStep("confirm")}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-[13px] text-red-600 font-medium hover:bg-red-100 transition-colors">
						<Trash2 className="w-3.5 h-3.5" />
						Delete my account
					</button>
				)}

				{step === "confirm" && (
					<div className="space-y-3">
						<p className="text-[12px] text-red-600 font-medium">
							Are you absolutely sure? Type{" "}
							<code className="font-mono bg-red-100 px-1.5 py-0.5 rounded text-red-700">
								delete my account
							</code>{" "}
							to continue.
						</p>
						<input
							value={confirmText}
							onChange={e => setConfirmText(e.target.value)}
							placeholder="delete my account"
							autoFocus
							className="w-full px-3 py-2.5 rounded-xl border border-red-200 bg-white text-sm text-[#0d0d0d] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all placeholder:text-[#c0b4a4] font-mono"
						/>
						<div className="flex gap-2">
							<button
								onClick={handleDelete}
								disabled={!canDelete || isPending}
								className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-[13px] font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
								{isPending ? (
									<Loader2 className="w-3.5 h-3.5 animate-spin" />
								) : (
									<Trash2 className="w-3.5 h-3.5" />
								)}
								Permanently delete
							</button>
							<button
								onClick={() => {
									setStep("idle");
									setConfirmText("");
								}}
								className="px-4 py-2 rounded-xl border border-[#e4d8c4] text-[13px] text-[#5c5244] hover:bg-[#f5f0e8] transition-colors">
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
