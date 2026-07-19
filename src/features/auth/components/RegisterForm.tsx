"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";

import { BrandPanel } from "@/components/ui/BrandPanel";
import { FormField } from "@/components/ui/FormField";
import { RegisterFormValues, registerSchema } from "../schema";
import { useRegister } from "../hooks/useRegister";
import { getPasswordStrength } from "@/lib/passwordStrength";
import { PhoneField } from "@/components/ui/Phonefield";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const { mutate: register_, isPending } = useRegister();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: { phone: "" },
	});

	const passwordValue = watch("password", "");
	const strength = getPasswordStrength(passwordValue);

	const onSubmit = (data: RegisterFormValues) => {
		register_({
			name: data.fullName,
			email: data.email,
			phone: data.phone,
			password: data.password,
		});
	};

	return (
		<main className="flex min-h-screen">
			<BrandPanel />

			<div className="flex-1 bg-brand-white flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
				<div className="w-full max-w-[440px] animate-fade-up">
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
							Create account
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							Join us — it only takes a moment
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						noValidate>
						<FormField
							label="Full name"
							type="text"
							placeholder="Your full name"
							autoComplete="name"
							error={errors.fullName?.message}
							{...register("fullName")}
						/>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<PhoneField
										label="Phone number"
										value={field.value}
										onChange={field.onChange}
										onBlur={field.onBlur}
										error={errors.phone?.message}
									/>
								)}
							/>
							<FormField
								label="Email address"
								type="email"
								placeholder="you@example.com"
								autoComplete="email"
								error={errors.email?.message}
								{...register("email")}
							/>
						</div>

						{/* Password + strength */}
						<div className="space-y-2">
							<FormField
								label="Password"
								type={showPassword ? "text" : "password"}
								placeholder="Min. 8 characters"
								autoComplete="new-password"
								error={errors.password?.message}
								rightElement={
									<button
										type="button"
										onClick={() => setShowPassword(v => !v)}
										className="text-brand-black/30 hover:text-brand-purple-dark transition-colors p-1"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								}
								{...register("password")}
							/>
							{passwordValue && (
								<div className="space-y-1 animate-fade-in">
									<div className="flex gap-1 h-[3px]">
										{[1, 2, 3, 4].map(i => (
											<div
												key={i}
												className={`flex-1 rounded-full transition-all duration-300 ${
													i <= strength.score
														? strength.color
														: "bg-surface-subtle"
												}`}
											/>
										))}
									</div>
									<p
										className={`text-[10px] tracking-wide ${strength.textColor}`}>
										{strength.label}
									</p>
								</div>
							)}
						</div>

						<FormField
							label="Confirm password"
							type={showConfirm ? "text" : "password"}
							placeholder="Repeat your password"
							autoComplete="new-password"
							error={errors.confirmPassword?.message}
							rightElement={
								<button
									type="button"
									onClick={() => setShowConfirm(v => !v)}
									className="text-brand-black/30 hover:text-brand-purple-dark transition-colors p-1"
									aria-label={showConfirm ? "Hide password" : "Show password"}>
									{showConfirm ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							}
							{...register("confirmPassword")}
						/>

						<p className="text-[11px] text-brand-black/40 leading-relaxed">
							By creating an account you agree to our{" "}
							<Link
								href="/terms"
								className="text-brand-purple-dark hover:text-brand-purple underline-offset-2 hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-brand-purple-dark hover:text-brand-purple underline-offset-2 hover:underline">
								Privacy Policy
							</Link>
							.
						</p>

						<button
							type="submit"
							disabled={isPending}
							className="relative w-full py-3.5 mt-1 bg-brand-navy text-brand-white text-sm font-medium tracking-widest uppercase rounded-[6px] transition-all duration-200 hover:bg-[#252550] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
							{isPending ? (
								<span className="flex items-center justify-center gap-2">
									<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
									Creating account…
								</span>
							) : (
								<span className="flex items-center justify-center gap-2">
									<UserPlus className="w-4 h-4" />
									Create Account
								</span>
							)}
						</button>
					</form>

					<div className="ornament-divider my-7 text-brand-purple/40 text-[9px]">
						✦
					</div>

					<p className="text-center text-sm text-brand-black/50">
						Already have an account?{" "}
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


