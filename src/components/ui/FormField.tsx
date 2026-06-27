"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	rightElement?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
	({ label, error, rightElement, className, ...props }, ref) => {
		return (
			<div className="space-y-1.5">
				<label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-brand-purple-dark">
					{label}
				</label>
				<div className="relative">
					<input
						ref={ref}
						className={cn(
							"w-full px-4 py-3 text-sm font-sans",
							"bg-brand-white border border-surface-subtle rounded-[6px]",
							"text-brand-black placeholder:text-brand-black/30",
							"outline-none transition-all duration-200",
							"focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10",
							error && "border-red-400 focus:border-red-400 focus:ring-red-100",
							rightElement && "pr-16",
							className,
						)}
						{...props}
					/>
					{rightElement && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2">
							{rightElement}
						</div>
					)}
				</div>
				{error && (
					<p className="flex items-center gap-1.5 text-[11px] text-red-500 animate-fade-in">
						<span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
						{error}
					</p>
				)}
			</div>
		);
	},
);

FormField.displayName = "FormField";
