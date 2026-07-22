"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

export default function DangerZoneSection() {
	const { deleteAccount, isDeleting } = useDeleteAccount();
	const [open, setOpen] = useState(false);
	const [confirmText, setConfirmText] = useState("");

	const CONFIRM_PHRASE = "delete my account";
	const canDelete = confirmText.toLowerCase() === CONFIRM_PHRASE;

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-2">
				<AlertTriangle className="w-4 h-4 text-red-500" />
				<h2 className="text-[15px] font-semibold text-brand-navy">
					Danger zone
				</h2>
			</div>

			<div className="p-4 rounded-xl border border-red-100 bg-red-50/50 space-y-3">
				<div>
					<p className="text-[13px] font-semibold text-red-700">
						Delete account
					</p>
					<p className="text-[12px] text-red-500 mt-0.5">
						This will permanently delete your account, purchases, reviews,
						and all saved data. This cannot be undone.
					</p>
				</div>

				<button
					onClick={() => setOpen(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-[13px] text-red-600 font-medium hover:bg-red-100 transition-colors">
					<Trash2 className="w-3.5 h-3.5" />
					Delete my account
				</button>
			</div>

			<Modal
				open={open}
				onClose={() => {
					setOpen(false);
					setConfirmText("");
				}}
				title="Delete your account?"
				description="This action is permanent and cannot be undone.">
				<div className="space-y-4">
					<p className="text-[13px] text-text-secondary">
						Type{" "}
						<code className="font-mono bg-red-100 px-1.5 py-0.5 rounded text-red-700">
							{CONFIRM_PHRASE}
						</code>{" "}
						to confirm.
					</p>
					<input
						value={confirmText}
						onChange={e => setConfirmText(e.target.value)}
						placeholder={CONFIRM_PHRASE}
						autoFocus
						className="w-full px-3 py-2.5 rounded-xl border border-red-200 bg-brand-white text-sm text-brand-black outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all placeholder:text-text-muted font-mono"
					/>
					<div className="flex gap-2 justify-end">
						<button
							onClick={() => {
								setOpen(false);
								setConfirmText("");
							}}
							className="px-4 py-2 rounded-xl border border-border text-[13px] text-text-secondary hover:bg-surface-subtle transition-colors">
							Cancel
						</button>
						<button
							onClick={() => deleteAccount()}
							disabled={!canDelete || isDeleting}
							className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-[13px] font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
							{isDeleting ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : (
								<Trash2 className="w-3.5 h-3.5" />
							)}
							Permanently delete
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
