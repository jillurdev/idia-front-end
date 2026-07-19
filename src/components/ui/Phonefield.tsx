"use client";

import { useEffect, useState } from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
	label: string;
	value?: string; // full E.164 value, e.g. "+8801812345678"
	onChange: (value: string) => void;
	onBlur?: () => void;
	error?: string;
}

// Wraps react-phone-number-input (backed by libphonenumber-js) so we get
// real per-country validation, a country dropdown, and an input that's
// hard-capped at that country's actual max valid length (via limitMaxLength) —
// so nobody can type a 25-digit "phone number".
export function PhoneField({
	label,
	value,
	onChange,
	onBlur,
	error,
}: PhoneFieldProps) {
	// No hardcoded country — detect it from the visitor's IP so international
	// users see their own country selected, not Bangladesh by default.
	const [detectedCountry, setDetectedCountry] = useState<Country | undefined>();

	useEffect(() => {
		// Only auto-select before the user has picked/typed anything.
		if (value) return;

		fetch("https://ipwho.is/")
			.then(res => res.json())
			.then(data => {
				if (data?.success && data?.country_code) {
					setDetectedCountry(data.country_code as Country);
				}
			})
			.catch(() => {
				// Silent fail — user just picks their country manually.
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="space-y-1.5">
			<label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-brand-purple-dark">
				{label}
			</label>
			<div
				className={cn(
					"phone-field-shell flex items-stretch bg-brand-white border border-surface-subtle rounded-[6px] px-1",
					"focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/10",
					"transition-all duration-200",
					error &&
						"border-red-400 focus-within:border-red-400 focus-within:ring-red-100",
				)}>
				<PhoneInput
					defaultCountry={detectedCountry}
					international
					countryCallingCodeEditable={false}
					limitMaxLength
					value={value}
					onChange={val => onChange(val ?? "")}
					onBlur={onBlur}
					placeholder="Phone number"
					className="w-full py-1.5"
					numberInputProps={{
						className:
							"flex-1 min-w-0 py-1.5 text-sm font-sans bg-transparent text-brand-black placeholder:text-brand-black/30 outline-none border-none",
					}}
				/>
			</div>
			{error && (
				<p className="flex items-center gap-1.5 text-[11px] text-red-500 animate-fade-in">
					<span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
					{error}
				</p>
			)}
		</div>
	);
}
