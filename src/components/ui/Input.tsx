"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const baseInput =
	"w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-text-primary text-sm outline-none transition-all duration-150 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 placeholder:text-text-muted/50 disabled:opacity-60 disabled:cursor-not-allowed";

type InputType =
	| "text"
	| "password"
	| "tel"
	| "email"
	| "number"
	| "date"
	| "textarea";

interface InputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> {
	type?: InputType;
	label?: string;
	error?: string;
	hint?: string;
	right?: React.ReactNode;
	prefix?: string;
	suffix?: string;
	rows?: number;
	showRequired?: boolean;
	wrapperClassName?: string;
	readOnly?: boolean;
}

export function Input({
	type = "text",
	label,
	error,
	hint,
	right,
	prefix,
	suffix,
	id,
	className,
	rows = 4,
	disabled,
	readOnly,
	showRequired = true,
	wrapperClassName,
	...props
}: InputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const inputId =
		id ?? (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
	const isPassword = type === "password";
	const isTextarea = type === "textarea";
	const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

	const errorClasses = error
		? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
		: "";

	const readOnlyClasses = readOnly
		? "cursor-default opacity-70 bg-surface-muted focus:border-border focus:ring-0"
		: "";

	const inputClasses = cn(
		baseInput,
		prefix && "pl-10",
		(isPassword || suffix) && "pr-10",
		errorClasses,
		readOnlyClasses,
		className,
	);

	const textareaClasses = cn(
		baseInput,
		"resize-none",
		errorClasses,
		readOnlyClasses,
		className,
	);

	return (
		<div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
			{/* Label row */}
			{(label || right) && (
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-1">
						{label && (
							<label
								htmlFor={inputId}
								className="text-[12px] font-medium text-text-primary">
								{label}
							</label>
						)}
						{showRequired ? (
							<span className="text-red-500 text-sm leading-none" aria-hidden>
								*
							</span>
						) : (
							<span className="text-[11px] text-text-muted">(optional)</span>
						)}
					</div>
					{right && <div className="text-[12px]">{right}</div>}
				</div>
			)}

			{/* Input wrapper */}
			<div className="relative flex items-center">
				{prefix && (
					<span className="absolute left-3.5 text-sm text-text-muted font-medium pointer-events-none select-none z-10">
						{prefix}
					</span>
				)}

				{isTextarea ? (
					<textarea
						id={inputId}
						rows={rows}
						disabled={disabled}
						readOnly={readOnly}
						className={textareaClasses}
						{...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
					/>
				) : (
					<input
						id={inputId}
						type={resolvedType}
						disabled={disabled}
						readOnly={readOnly}
						className={inputClasses}
						{...props}
					/>
				)}

				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword(v => !v)}
						className="absolute right-3 text-text-muted hover:text-text-primary transition-colors"
						aria-label={showPassword ? "Hide password" : "Show password"}>
						{showPassword ? <EyeOffIcon /> : <EyeIcon />}
					</button>
				)}

				{suffix && !isPassword && (
					<span className="absolute right-3.5 text-sm text-text-muted font-medium pointer-events-none select-none">
						{suffix}
					</span>
				)}
			</div>

			{/* Error */}
			{error && (
				<p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
					<span>✗</span> {error}
				</p>
			)}

			{/* Hint */}
			{hint && !error && <p className="text-[11px] text-text-muted">{hint}</p>}
		</div>
	);
}

function EyeIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function EyeOffIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
			<line x1="1" y1="1" x2="23" y2="23" />
		</svg>
	);
}
