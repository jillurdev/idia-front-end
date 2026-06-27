
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { BrandPanel } from "@/components/ui/BrandPanel";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyEmailPage({email}:{email:string}) {


	const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
	const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
	const [canResend, setCanResend] = useState(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
	const { mutate: resendOtp, isPending: isResending } = useResendOtp();

	// Countdown timer
	useEffect(() => {
		if (canResend) return;
		if (countdown <= 0) {
			setCanResend(true);
			return;
		}
		const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
		return () => clearTimeout(timer);
	}, [countdown, canResend]);

	// Auto-submit when all 6 digits filled
	useEffect(() => {
		const code = otp.join("");
		if (code.length === OTP_LENGTH && !otp.includes("")) {
			verifyEmail({ email, otp: code });
		}
	}, [otp]);

	const handleChange = (index: number, value: string) => {
		// Allow only digits
		const digit = value.replace(/\D/g, "").slice(-1);

		const next = [...otp];
		next[index] = digit;
		setOtp(next);

		// Move to next input
		if (digit && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace") {
			if (otp[index]) {
				// Clear current
				const next = [...otp];
				next[index] = "";
				setOtp(next);
			} else if (index > 0) {
				// Move to previous
				inputRefs.current[index - 1]?.focus();
			}
		}

		if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pasted = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, OTP_LENGTH);
		if (!pasted) return;

		const next = [...otp];
		pasted.split("").forEach((char, i) => {
			next[i] = char;
		});
		setOtp(next);
		// Focus last filled or last input
		const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1);
		inputRefs.current[lastIndex]?.focus();
	};

	const handleResend = () => {
		if (!canResend || isResending) return;
		resendOtp({ email });
		setOtp(Array(OTP_LENGTH).fill(""));
		setCountdown(RESEND_COOLDOWN);
		setCanResend(false);
		inputRefs.current[0]?.focus();
	};

	const isComplete = otp.join("").length === OTP_LENGTH && !otp.includes("");

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

					{/* Icon */}
					<div className="mb-6 w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
						<Mail className="w-5 h-5 text-brand-purple-dark" />
					</div>

					{/* Header */}
					<div className="mb-8">
						<h2 className="font-serif text-[32px] font-semibold text-brand-navy leading-tight">
							Check your email
						</h2>
						<p className="text-sm text-brand-black/50 mt-1.5 font-light">
							We sent a 6-digit code to{" "}
							<span className="text-brand-navy font-medium">
								{email || "your email"}
							</span>
						</p>
					</div>

					{/* OTP inputs */}
					<div className="flex gap-3 mb-8" onPaste={handlePaste}>
						{otp.map((digit, i) => (
							<input
								key={i}
								ref={el => {
									inputRefs.current[i] = el;
								}}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit}
								onChange={e => handleChange(i, e.target.value)}
								onKeyDown={e => handleKeyDown(i, e)}
								disabled={isVerifying}
								className={`
                  w-full aspect-square text-center text-xl font-semibold
                  border rounded-[6px] outline-none transition-all duration-150
                  text-brand-navy bg-brand-white
                  ${
										digit ? "border-brand-purple-dark" : "border-brand-black/20"
									}
                  focus:border-brand-purple-dark focus:ring-2 focus:ring-brand-purple/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
							/>
						))}
					</div>

					{/* Submit button — shows when all filled but auto-submit handles it */}
					<button
						onClick={() => verifyEmail({ email, otp: otp.join("") })}
						disabled={!isComplete || isVerifying}
						className="
              w-full py-3.5 mb-6
              bg-brand-navy text-brand-white
              text-sm font-medium tracking-widest uppercase
              rounded-[6px] transition-all duration-200
              hover:bg-brand-purple-dark active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-brand-purple focus-visible:ring-offset-2
            ">
						{isVerifying ? (
							<span className="flex items-center justify-center gap-2">
								<span className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
								Verifying…
							</span>
						) : (
							"Verify Email"
						)}
					</button>

					{/* Resend */}
					<p className="text-center text-sm text-brand-black/50">
						Didn&apos;t receive the code?{" "}
						{canResend ? (
							<button
								onClick={handleResend}
								disabled={isResending}
								className="text-brand-purple-dark font-medium hover:text-brand-purple transition-colors disabled:opacity-50">
								{isResending ? "Sending…" : "Resend code"}
							</button>
						) : (
							<span className="text-brand-black/30">
								Resend in{" "}
								<span className="font-medium tabular-nums text-brand-navy">
									{String(Math.floor(countdown / 60)).padStart(2, "0")}:
									{String(countdown % 60).padStart(2, "0")}
								</span>
							</span>
						)}
					</p>

					<div className="ornament-divider my-7 text-brand-purple/40 text-[9px]">
						✦
					</div>

					<p className="text-center text-sm text-brand-black/50">
						Wrong email?{" "}
						<Link
							href="/register"
							className="text-brand-purple-dark font-medium hover:text-brand-purple transition-colors">
							Go back
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
