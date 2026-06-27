'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send } from "lucide-react";

import { BrandPanel } from "@/components/ui/BrandPanel";
import { FormField } from "@/components/ui/FormField";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

const schema = z.object({
	email: z.string().email("Please enter a valid email"),
});
type FormValues = z.infer<typeof schema>;

export default function ForgotPassword() {
	const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		forgotPassword(data);
	};

	if (isSuccess) {
		return (
			<main className="flex min-h-screen">
				<BrandPanel />
				<div className="flex-1 bg-brand-white flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
					<div className="w-full max-w-[400px] animate-fade-up text-center">
						<div className="mb-6 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
							<Send className="w-5 h-5 text-emerald-600" />
						</div>
						<h2 className="font-serif text-[28px] font-semibold text-brand-navy mb-3">
							Check your email
						</h2>
						<p className="text-sm text-brand-black/50 mb-2">
							We sent a reset link to
						</p>
						<p className="text-sm font-medium text-brand-navy mb-8">
							{getValues("email")}
						</p>
						<p className="text-xs text-brand-black/40 mb-8">
							Didn&apos;t receive it? Check your spam folder. The link expires
							in 15 minutes.
						</p>
						<Link
							href="/login"
							className="text-sm text-brand-purple-dark font-medium hover:text-brand-purple transition-colors">
							Back to sign in
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
							Forgot password?
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							Enter your email and we&apos;ll send you a reset link
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						noValidate>
						<FormField
							label="Email address"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							error={errors.email?.message}
							{...register("email")}
						/>

						<button
							type="submit"
							disabled={isPending}
							className="w-full py-3.5 mt-2 bg-brand-navy text-brand-white text-sm font-medium tracking-widest uppercase rounded-[6px] transition-all duration-200 hover:bg-brand-purple-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
							{isPending ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									Sending…
								</span>
							) : (
								"Send Reset Link"
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
