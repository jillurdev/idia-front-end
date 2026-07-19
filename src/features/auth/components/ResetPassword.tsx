
import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { BrandPanel } from "@/components/ui/BrandPanel";
import { FormField } from "@/components/ui/FormField";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

const schema = z
	.object({
		newPassword: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine(d => d.newPassword === d.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
type FormValues = z.infer<typeof schema>;

export default function ResetPassword({token}:{token:string}) {
	

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const { mutate: resetPassword, isPending } = useResetPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		resetPassword({ token, newPassword: data.newPassword });
	};

	// No token — invalid link
	if (!token) {
		return (
			<main className="flex min-h-screen">
				<BrandPanel />
				<div className="flex-1 bg-brand-white flex items-center justify-center px-6">
					<div className="text-center">
						<h2 className="font-serif text-2xl text-brand-navy mb-3">
							Invalid reset link
						</h2>
						<p className="text-sm text-brand-black/50 mb-6">
							This link is invalid or has expired.
						</p>
						<Link
							href="/forgot-password"
							className="text-brand-purple-dark font-medium hover:text-brand-purple transition-colors text-sm">
							Request a new one
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen">
			<BrandPanel />

			<div className="flex-1 bg-brand-white flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
				<div className="w-full max-w-[400px] animate-fade-up">
					{/* Mobile header */}
					<div className="lg:hidden mb-10">
						<Link
							href="/"
							className="inline-flex items-center gap-1.5 text-[11px] text-brand-black/40 hover:text-brand-purple-dark transition-colors tracking-wide mb-6 group">
							<ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
							Back to home
						</Link>
						<div className="text-center">
							<Link href="/">
								<h1 className="font-serif text-4xl font-semibold text-brand-navy hover:text-brand-purple-dark transition-colors">
									IdiaDesigns
								</h1>
							</Link>
							<p className="font-serif italic text-brand-purple text-sm mt-1">
								Where elegance meets excellence
							</p>
						</div>
					</div>

					{/* Header */}
					<div className="mb-8">
						<h2 className="font-serif text-[32px] font-semibold text-brand-navy leading-tight">
							Reset password
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							Enter your new password below
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						noValidate>
						<FormField
							label="New password"
							type={showPassword ? "text" : "password"}
							placeholder="Min. 6 characters"
							autoComplete="new-password"
							error={errors.newPassword?.message}
							rightElement={
								<button
									type="button"
									onClick={() => setShowPassword(v => !v)}
									className="text-brand-black/30 hover:text-brand-purple-dark transition-colors p-1">
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							}
							{...register("newPassword")}
						/>

						<FormField
							label="Confirm new password"
							type={showConfirm ? "text" : "password"}
							placeholder="Repeat your password"
							autoComplete="new-password"
							error={errors.confirmPassword?.message}
							rightElement={
								<button
									type="button"
									onClick={() => setShowConfirm(v => !v)}
									className="text-brand-black/30 hover:text-brand-purple-dark transition-colors p-1">
									{showConfirm ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							}
							{...register("confirmPassword")}
						/>

						<button
							type="submit"
							disabled={isPending}
							className="w-full py-3.5 mt-2 bg-brand-navy text-brand-white text-sm font-medium tracking-widest uppercase rounded-[6px] transition-all duration-200 hover:bg-brand-purple-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
							{isPending ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									Resetting…
								</span>
							) : (
								"Reset Password"
							)}
						</button>
					</form>

					<div className="ornament-divider my-7 text-brand-purple/40 text-[9px]">
						✦
					</div>

					<p className="text-center text-sm text-brand-black/50">
						Remember your password?{" "}
						<Link
							href="/login"
							className="text-brand-purple-dark font-medium hover:text-brand-purple transition-colors">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
