"use client";

import { useRef, useState, useEffect } from "react";
import { Link2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
	label: string;
	value: string; // the image URL — either a pasted URL, or a local blob preview while a file is pending upload
	onChange: (url: string) => void;
	// Called when the user picks a file. The parent (form) holds onto this
	// File and uploads it to Cloudinary only when the form is actually
	// submitted — nothing is sent to the backend just from selecting a file.
	onFileSelected: (file: File | null) => void;
	error?: string;
}

export function ImageUploadField({
	label,
	value,
	onChange,
	onFileSelected,
	error,
}: ImageUploadFieldProps) {
	const [mode, setMode] = useState<"url" | "upload">("url");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const objectUrlRef = useRef<string | null>(null);

	// Clean up the blob preview URL when the component unmounts or the
	// value changes away from it, so we don't leak memory.
	useEffect(() => {
		return () => {
			if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
		};
	}, []);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
		const previewUrl = URL.createObjectURL(file);
		objectUrlRef.current = previewUrl;

		onChange(previewUrl); // local preview only — not uploaded yet
		onFileSelected(file); // parent holds this for upload at submit time
	};

	const handleClear = () => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = null;
		}
		onChange("");
		onFileSelected(null);
	};

	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between">
				<label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-brand-purple-dark">
					{label}
				</label>
				<div className="flex items-center gap-1 bg-surface-subtle rounded-full p-0.5">
					<button
						type="button"
						onClick={() => setMode("url")}
						className={cn(
							"flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors",
							mode === "url"
								? "bg-brand-white text-brand-navy shadow-sm"
								: "text-text-muted",
						)}>
						<Link2 className="w-2.5 h-2.5" />
						URL
					</button>
					<button
						type="button"
						onClick={() => setMode("upload")}
						className={cn(
							"flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors",
							mode === "upload"
								? "bg-brand-white text-brand-navy shadow-sm"
								: "text-text-muted",
						)}>
						<Upload className="w-2.5 h-2.5" />
						Upload
					</button>
				</div>
			</div>

			{mode === "url" ? (
				<input
					type="text"
					value={value.startsWith("blob:") ? "" : value}
					onChange={e => {
						onFileSelected(null); // typing a URL cancels any pending file
						onChange(e.target.value);
					}}
					placeholder="https://..."
					className={cn(
						"w-full px-4 py-3 text-sm font-sans",
						"bg-brand-white border border-surface-subtle rounded-[6px]",
						"text-brand-black placeholder:text-brand-black/30",
						"outline-none transition-all duration-200",
						"focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10",
						error && "border-red-400 focus:border-red-400 focus:ring-red-100",
					)}
				/>
			) : (
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-surface-subtle rounded-[6px] text-sm text-text-muted hover:border-brand-purple/40 hover:text-brand-purple-dark transition-colors">
					<Upload className="w-4 h-4" />
					{value.startsWith("blob:")
						? "Choose a different image"
						: "Choose an image"}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						className="hidden"
					/>
				</button>
			)}

			{value && (
				<div className="relative inline-block mt-1">
					<img
						src={value}
						alt="Preview"
						className="h-20 w-20 object-cover rounded-lg border border-surface-subtle"
					/>
					{value.startsWith("blob:") && (
						<span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] px-1.5 py-0.5 bg-brand-navy text-brand-white rounded-full">
							Uploads on submit
						</span>
					)}
					<button
						type="button"
						onClick={handleClear}
						className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-white border border-surface-subtle rounded-full flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-300 transition-colors">
						<X className="w-3 h-3" />
					</button>
				</div>
			)}

			{error && (
				<p className="flex items-center gap-1.5 text-[11px] text-red-500 animate-fade-in">
					<span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
					{error}
				</p>
			)}
		</div>
	);
}
