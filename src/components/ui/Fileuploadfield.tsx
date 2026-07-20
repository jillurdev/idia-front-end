"use client";

import { useRef, useState, useEffect } from "react";
import { Link2, Upload, X, FileArchive, FileVideo } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FileKind = "video" | "file";

interface FileUploadFieldProps {
	label: string;
	value: string; // pasted URL, or a local blob preview while a file is pending upload
	onChange: (url: string) => void;
	// Parent holds the File and uploads it to Cloudinary only at form-submit
	// time — selecting a file here makes zero network calls.
	onFileSelected: (file: File | null) => void;
	kind: FileKind;
	accept?: string;
	maxSizeMb?: number; // client-side pre-check only — server enforces the real limit
	hint?: string;
	error?: string;
}

const KIND_CONFIG: Record<FileKind, { icon: typeof FileVideo; label: string }> =
	{
		video: { icon: FileVideo, label: "video" },
		file: { icon: FileArchive, label: "file" },
	};

export function FileUploadField({
	label,
	value,
	onChange,
	onFileSelected,
	kind,
	accept,
	maxSizeMb,
	hint,
	error,
}: FileUploadFieldProps) {
	const [mode, setMode] = useState<"url" | "upload">("url");
	const [pendingFileName, setPendingFileName] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const objectUrlRef = useRef<string | null>(null);
	const { icon: Icon } = KIND_CONFIG[kind];

	useEffect(() => {
		return () => {
			if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
		};
	}, []);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
			toast.error(`File is too large — max ${maxSizeMb}MB`);
			return;
		}

		if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
		const previewUrl = URL.createObjectURL(file);
		objectUrlRef.current = previewUrl;

		onChange(previewUrl); // placeholder only — not uploaded yet
		onFileSelected(file);
		setPendingFileName(file.name);
	};

	const handleClear = () => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = null;
		}
		onChange("");
		onFileSelected(null);
		setPendingFileName(null);
	};

	const isPending = value.startsWith("blob:");

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
					value={isPending ? "" : value}
					onChange={e => {
						onFileSelected(null);
						setPendingFileName(null);
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
					{isPending
						? "Choose a different file"
						: `Choose a ${KIND_CONFIG[kind].label}`}
					<input
						ref={fileInputRef}
						type="file"
						accept={accept}
						onChange={handleFileSelect}
						className="hidden"
					/>
				</button>
			)}

			{value && (
				<div className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] bg-brand-purple/5 border border-brand-purple/10">
					<Icon className="w-4 h-4 text-brand-purple-dark flex-shrink-0" />
					<span className="text-[12px] text-brand-navy truncate flex-1">
						{pendingFileName ?? value}
					</span>
					{isPending && (
						<span className="text-[9px] px-1.5 py-0.5 bg-brand-navy text-brand-white rounded-full whitespace-nowrap">
							Uploads on submit
						</span>
					)}
					<button
						type="button"
						onClick={handleClear}
						className="text-text-muted hover:text-red-500 transition-colors flex-shrink-0">
						<X className="w-3.5 h-3.5" />
					</button>
				</div>
			)}

			{hint && !value && <p className="text-[11px] text-text-muted">{hint}</p>}

			{error && (
				<p className="flex items-center gap-1.5 text-[11px] text-red-500 animate-fade-in">
					<span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
					{error}
				</p>
			)}
		</div>
	);
}
