"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

import { FormField } from "@/components/ui/FormField";
import { BrandPanel } from "@/components/ui/BrandPanel";
import { LoginFormValues, loginSchema } from "../schema";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: login, isPending } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormValues) => {
		login(data); // that's it
	};

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
							Welcome back
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							Sign in to your account to continue
						</p>
					</div>

					{/* Form */}
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

						<FormField
							label="Password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
							autoComplete="current-password"
							error={errors.password?.message}
							rightElement={
								<button
									type="button"
									onClick={() => setShowPassword(v => !v)}
									className="text-brand-black/30 hover:text-brand-purple-dark transition-colors p-1"
									aria-label={showPassword ? "Hide password" : "Show password"}>
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							}
							{...register("password")}
						/>

						<div className="flex justify-end -mt-2">
							<Link
								href="/forgot-password"
								className="text-[11px] text-brand-purple-dark hover:text-brand-purple transition-colors tracking-wide">
								Forgot password?
							</Link>
						</div>

						<button
							type="submit"
							disabled={isPending}
							className="relative w-full py-3.5 mt-2 bg-brand-navy text-brand-white text-sm font-medium tracking-widest uppercase rounded-[6px] transition-all duration-200 hover:bg-brand-purple-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
							{isPending ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									Signing in…
								</span>
							) : (
								<span className="flex items-center justify-center gap-2">
									<LogIn className="w-4 h-4" />
									Sign In
								</span>
							)}
						</button>
					</form>

					<div className="ornament-divider my-7 text-brand-purple/40 text-[9px]">
						✦
					</div>

					<p className="text-center text-sm text-brand-black/50">
						Don&apos;t have an account?{" "}
						<Link
							href="/register"
							className="text-brand-purple-dark font-medium hover:text-brand-purple transition-colors">
							Create one
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
