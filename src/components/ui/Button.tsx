import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	loading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
	primary:
		"bg-brand-purple hover:bg-brand-purple-dark text-white border-transparent",
	secondary:
		"bg-surface hover:bg-surface-muted text-text-primary border-border",
	outline:
		"bg-transparent hover:bg-brand-purple/10 text-brand-purple border-brand-purple",
	ghost:
		"bg-transparent hover:bg-surface-subtle text-text-primary border-transparent",
	danger: "bg-red-500 hover:bg-red-600 text-white border-transparent",
};

const sizeClasses: Record<Size, string> = {
	sm: "px-3 py-1.5 text-[12px] gap-1.5 rounded-md",
	md: "px-4 py-2.5 text-sm gap-2 rounded-lg",
	lg: "px-5 py-3 text-[15px] gap-2 rounded-lg",
};

export function Button({
	variant = "primary",
	size = "md",
	loading = false,
	loadingText,
	fullWidth = false,
	leftIcon,
	rightIcon,
	children,
	disabled,
	className,
	...props
}: ButtonProps) {
	const isDisabled = disabled || loading;

	return (
		<button
			disabled={isDisabled}
			className={cn(
				"inline-flex items-center justify-center font-medium border",
				"transition-all duration-150 active:scale-[0.98]",
				"disabled:opacity-60 disabled:cursor-not-allowed",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2",
				variantClasses[variant],
				sizeClasses[size],
				fullWidth && "w-full",
				className,
			)}
			{...props}>
			{loading ? (
				<>
					<span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin shrink-0" />
					{loadingText ?? children}
				</>
			) : (
				<>
					{leftIcon && <span className="shrink-0">{leftIcon}</span>}
					{children}
					{rightIcon && <span className="shrink-0">{rightIcon}</span>}
				</>
			)}
		</button>
	);
}
