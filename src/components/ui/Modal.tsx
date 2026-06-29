"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	size?: "sm" | "md" | "lg" | "xl";
	children: React.ReactNode;
}

const SIZE_MAP = {
	sm: "max-w-sm",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
};

export function Modal({
	open,
	onClose,
	title,
	description,
	size = "md",
	children,
}: ModalProps) {
	// ESC key close
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open, onClose]);

	// Body scroll lock
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-brand-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative w-full bg-surface rounded-xl shadow-xl border border-border animate-fade-up",
					SIZE_MAP[size],
				)}>
				{/* Header */}
				<div className="flex items-start justify-between px-6 py-4 border-b border-border">
					<div>
						<h2 className="font-serif text-lg font-semibold text-brand-navy">
							{title}
						</h2>
						{description && (
							<p className="text-[12px] text-text-muted mt-0.5">
								{description}
							</p>
						)}
					</div>
					<button
						onClick={onClose}
						className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors mt-0.5">
						<X className="w-4 h-4" />
					</button>
				</div>
				<div className="px-6 py-5 overflow-y-auto max-h-[70vh]">{children}</div>
			</div>
		</div>
	);
}
