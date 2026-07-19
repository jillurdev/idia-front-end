"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
	AlertIcon,
	CheckIcon,
	FileTextIcon,
	PlusIcon,
	RefreshIcon,
	SpinnerIcon,
	TrashIcon,
	UploadCloudIcon,
	VideoIcon,
} from "./icons";
import type {
	FileItem,
	FileKind,
	FileUploadValue,
	UploadFn,
	UploadedFile,
} from "./types";

export type { UploadedFile, UploadFn, FileUploadValue } from "./types";

export interface FileUploadProps {
	label?: string;
	name?: string;
	/** Allow selecting/holding more than one file. Default: false */
	multiple?: boolean;
	/** Only used when multiple=true */
	maxFiles?: number;
	maxSizeMB?: number;
	/** Native `accept` string, e.g. "image/*" or ".pdf,.zip,.docx" */
	accept?: string;
	/** Controlled value — hook this up via react-hook-form's Controller (see bottom of file) */
	value?: FileUploadValue;
	onChange?: (value: FileUploadValue) => void;
	onBlur?: () => void;
	/** Your Cloudinary/S3/B2/etc upload function */
	uploadFn: UploadFn;
	error?: string;
	hint?: string;
	disabled?: boolean;
	showRequired?: boolean;
	className?: string;
}

function getKind(type?: string, name?: string): FileKind {
	const t = type || "";
	if (t.startsWith("image/")) return "image";
	if (t.startsWith("video/")) return "video";
	if (t === "application/pdf" || name?.toLowerCase().endsWith(".pdf"))
		return "pdf";
	return "other";
}

function formatSize(bytes?: number) {
	if (bytes === undefined) return "";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toArray(value?: FileUploadValue): UploadedFile[] {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
}

let idCounter = 0;
function uid() {
	idCounter += 1;
	return `f${Date.now()}_${idCounter}`;
}

function fromUploaded(f: UploadedFile): FileItem {
	return {
		id: uid(),
		previewUrl: f.url,
		name: f.name,
		size: f.size,
		type: f.type,
		kind: getKind(f.type, f.name),
		status: "done",
		progress: 100,
		uploaded: f,
	};
}

export function FileUpload({
	label,
	name,
	multiple = false,
	maxFiles = 10,
	maxSizeMB = 20,
	accept,
	value,
	onChange,
	onBlur,
	uploadFn,
	error,
	hint,
	disabled = false,
	showRequired = true,
	className = "",
}: FileUploadProps) {
	const inputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	const replaceIdRef = useRef<string | null>(null);
	const seededRef = useRef(false);

	const [items, setItems] = useState<FileItem[]>(() =>
		toArray(value).map(fromUploaded),
	);
	const [dragActive, setDragActive] = useState(false);

	// Resync when the outside value changes (e.g. form.reset()) and nothing is mid-upload.
	useEffect(() => {
		if (!seededRef.current) {
			seededRef.current = true;
			return;
		}
		if (items.some(i => i.file)) return;
		const incoming = toArray(value);
		const currentUrls = items.map(i => i.uploaded?.url).join(",");
		const incomingUrls = incoming.map(f => f.url).join(",");
		if (currentUrls === incomingUrls) return;
		setItems(incoming.map(fromUploaded));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		return () => {
			items.forEach(i => i.file && URL.revokeObjectURL(i.previewUrl));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const emit = useCallback(
		(next: FileItem[]) => {
			const uploaded = next
				.filter(i => i.status === "done" && i.uploaded)
				.map(i => i.uploaded as UploadedFile);
			onChange?.(multiple ? uploaded : (uploaded[0] ?? null));
		},
		[multiple, onChange],
	);

	const runUpload = useCallback(
		(id: string, file: File) => {
			uploadFn(file, percent =>
				setItems(prev =>
					prev.map(i => (i.id === id ? { ...i, progress: percent } : i)),
				),
			)
				.then(uploaded => {
					setItems(prev => {
						const next = prev.map(i =>
							i.id === id
								? {
										...i,
										status: "done" as const,
										progress: 100,
										uploaded,
										previewUrl:
											i.kind === "image" || i.kind === "video"
												? i.previewUrl
												: uploaded.url,
									}
								: i,
						);
						emit(next);
						return next;
					});
				})
				.catch((err: unknown) => {
					const message = err instanceof Error ? err.message : "Upload failed";
					setItems(prev =>
						prev.map(i =>
							i.id === id
								? { ...i, status: "error" as const, error: message }
								: i,
						),
					);
				});
		},
		[uploadFn, emit],
	);

	const addFiles = useCallback(
		(fileList: FileList | File[]) => {
			if (disabled) return;
			const incoming = Array.from(fileList);
			if (incoming.length === 0) return;

			const withinSize = incoming.filter(
				f => f.size <= maxSizeMB * 1024 * 1024,
			);
			const oversized = incoming.filter(f => f.size > maxSizeMB * 1024 * 1024);

			const makeItem = (file: File): FileItem => ({
				id: uid(),
				file,
				previewUrl: URL.createObjectURL(file),
				name: file.name,
				size: file.size,
				type: file.type,
				kind: getKind(file.type, file.name),
				status: "uploading",
				progress: 0,
			});

			setItems(prev => {
				let next: FileItem[];
				if (!multiple) {
					prev.forEach(i => i.file && URL.revokeObjectURL(i.previewUrl));
					next = withinSize.slice(0, 1).map(makeItem);
				} else {
					const room = Math.max(0, maxFiles - prev.length);
					next = [...prev, ...withinSize.slice(0, room).map(makeItem)];
				}
				next.forEach(i => {
					if (i.status === "uploading" && i.file) runUpload(i.id, i.file);
				});
				return next;
			});

			if (oversized.length > 0) {
				setItems(prev => [
					...prev,
					...oversized.map(f => ({
						id: uid(),
						name: f.name,
						size: f.size,
						type: f.type,
						kind: getKind(f.type, f.name),
						previewUrl: "",
						status: "error" as const,
						progress: 0,
						error: `File exceeds ${maxSizeMB}MB limit`,
					})),
				]);
			}
		},
		[disabled, maxFiles, maxSizeMB, multiple, runUpload],
	);

	const handleReplace = useCallback(
		(fileList: FileList | File[], id: string) => {
			const file = Array.from(fileList)[0];
			if (!file) return;
			setItems(prev =>
				prev.map(i =>
					i.id === id
						? {
								id,
								file,
								previewUrl: URL.createObjectURL(file),
								name: file.name,
								size: file.size,
								type: file.type,
								kind: getKind(file.type, file.name),
								status: "uploading" as const,
								progress: 0,
							}
						: i,
				),
			);
			runUpload(id, file);
		},
		[runUpload],
	);

	const removeItem = useCallback(
		(id: string) => {
			setItems(prev => {
				const target = prev.find(i => i.id === id);
				if (target?.file) URL.revokeObjectURL(target.previewUrl);
				const next = prev.filter(i => i.id !== id);
				emit(next);
				return next;
			});
		},
		[emit],
	);

	const retryItem = useCallback(
		(id: string) => {
			const item = items.find(i => i.id === id);
			if (!item?.file) return;
			setItems(prev =>
				prev.map(i =>
					i.id === id
						? { ...i, status: "uploading", progress: 0, error: undefined }
						: i,
				),
			);
			runUpload(id, item.file);
		},
		[items, runUpload],
	);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		if (replaceIdRef.current) {
			handleReplace(files, replaceIdRef.current);
			replaceIdRef.current = null;
		} else {
			addFiles(files);
		}
		e.target.value = "";
	};

	const openPicker = (replaceId?: string) => {
		if (disabled) return;
		replaceIdRef.current = replaceId ?? null;
		inputRef.current?.click();
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(false);
		if (disabled) return;
		if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
	};

	const canAddMore = multiple ? items.length < maxFiles : items.length === 0;
	const acceptHint = accept ? accept.split(",").join(", ") : "any file";

	return (
		<div className={`space-y-1.5 ${className}`}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-text-primary">
					{label}
					{showRequired && <span className="text-brand-purple"> *</span>}
				</label>
			)}

			<input
				ref={inputRef}
				id={inputId}
				name={name}
				type="file"
				className="hidden"
				accept={accept}
				multiple={multiple}
				disabled={disabled}
				onChange={onInputChange}
				onBlur={onBlur}
			/>

			{items.length > 0 && (
				<div
					className={
						multiple
							? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
							: ""
					}>
					{items.map(item => (
						<FileItemCard
							key={item.id}
							item={item}
							wide={!multiple}
							disabled={disabled}
							onRemove={() => removeItem(item.id)}
							onReplace={() => openPicker(item.id)}
							onRetry={() => retryItem(item.id)}
						/>
					))}

					{multiple && canAddMore && (
						<button
							type="button"
							onClick={() => openPicker()}
							disabled={disabled}
							className="flex flex-col items-center justify-center gap-1.5 aspect-square rounded-xl border-2 border-dashed border-border text-text-muted hover:border-brand-purple hover:text-brand-purple hover:bg-accent-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							<PlusIcon className="w-5 h-5" />
							<span className="text-xs font-medium">Add more</span>
						</button>
					)}
				</div>
			)}

			{items.length === 0 && (
				<div
					onClick={() => openPicker()}
					onDragOver={e => {
						e.preventDefault();
						if (!disabled) setDragActive(true);
					}}
					onDragLeave={() => setDragActive(false)}
					onDrop={onDrop}
					className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center cursor-pointer transition-colors ${
						dragActive
							? "border-brand-purple bg-accent-subtle"
							: "border-border bg-surface-subtle hover:border-brand-purple-light"
					} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${error ? "border-red-400" : ""}`}>
					<div className="w-10 h-10 rounded-full bg-gradient-brand-soft flex items-center justify-center text-brand-purple">
						<UploadCloudIcon className="w-5 h-5" />
					</div>
					<p className="text-sm text-text-primary">
						<span className="font-medium text-brand-purple">
							Click to upload
						</span>{" "}
						or drag & drop
					</p>
					<p className="text-[11px] text-text-muted">
						{acceptHint} · up to {maxSizeMB}MB
						{multiple ? ` · max ${maxFiles} files` : ""}
					</p>
				</div>
			)}

			{hint && !error && <p className="text-[11px] text-text-muted">{hint}</p>}
			{error && (
				<p className="text-[11px] text-red-500 flex items-center gap-1">
					<AlertIcon className="w-3.5 h-3.5" /> {error}
				</p>
			)}
		</div>
	);
}

function FileItemCard({
	item,
	wide,
	disabled,
	onRemove,
	onReplace,
	onRetry,
}: {
	item: FileItem;
	wide: boolean;
	disabled?: boolean;
	onRemove: () => void;
	onReplace: () => void;
	onRetry: () => void;
}) {
	return (
		<div
			className={`group relative rounded-xl border border-border bg-surface overflow-hidden ${
				wide ? "flex items-center gap-3 p-3" : "aspect-square"
			} ${item.status === "error" ? "border-red-300" : ""}`}>
			<div
				className={
					wide
						? "w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-surface-subtle flex items-center justify-center"
						: "w-full h-full bg-surface-subtle flex items-center justify-center"
				}>
				{item.kind === "image" && item.previewUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={item.previewUrl}
						alt={item.name}
						className="w-full h-full object-cover"
					/>
				) : item.kind === "video" && item.previewUrl ? (
					<video
						src={item.previewUrl}
						className="w-full h-full object-cover"
						muted
					/>
				) : item.kind === "pdf" ? (
					<FileTextIcon className="w-6 h-6 text-brand-purple" />
				) : item.kind === "video" ? (
					<VideoIcon className="w-6 h-6 text-brand-purple" />
				) : (
					<FileTextIcon className="w-6 h-6 text-text-muted" />
				)}
			</div>

			{wide && (
				<div className="min-w-0 flex-1">
					<p className="text-sm font-medium text-text-primary truncate">
						{item.name}
					</p>
					<p className="text-[11px] text-text-muted">{formatSize(item.size)}</p>
					{item.status === "uploading" && (
						<ProgressBar progress={item.progress} />
					)}
					{item.status === "error" && (
						<p className="text-[11px] text-red-500 mt-1">{item.error}</p>
					)}
				</div>
			)}

			{!wide && item.status === "uploading" && (
				<div className="absolute inset-0 bg-brand-black/50 flex flex-col items-center justify-center gap-1.5 text-white">
					<SpinnerIcon className="w-5 h-5 animate-spin" />
					<span className="text-[10px] font-medium">
						{Math.round(item.progress)}%
					</span>
				</div>
			)}
			{!wide && item.status === "error" && (
				<div className="absolute inset-0 bg-red-500/80 flex flex-col items-center justify-center gap-1 text-white p-2 text-center">
					<AlertIcon className="w-4 h-4" />
					<span className="text-[10px] leading-tight">{item.error}</span>
				</div>
			)}
			{!wide && item.status === "done" && (
				<div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-brand-purple text-white flex items-center justify-center">
					<CheckIcon className="w-2.5 h-2.5" />
				</div>
			)}

			{!disabled && (
				<div
					className={
						wide
							? "flex items-center gap-1 shrink-0"
							: "absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
					}>
					{item.status === "error" && item.file && (
						<button
							type="button"
							onClick={onRetry}
							title="Retry"
							className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur border border-border flex items-center justify-center text-text-secondary hover:text-brand-purple hover:border-brand-purple">
							<RefreshIcon className="w-3.5 h-3.5" />
						</button>
					)}
					{item.status === "done" && (
						<button
							type="button"
							onClick={onReplace}
							title="Replace"
							className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur border border-border flex items-center justify-center text-text-secondary hover:text-brand-purple hover:border-brand-purple">
							<RefreshIcon className="w-3.5 h-3.5" />
						</button>
					)}
					<button
						type="button"
						onClick={onRemove}
						title="Remove"
						className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur border border-border flex items-center justify-center text-text-secondary hover:text-red-500 hover:border-red-300">
						<TrashIcon className="w-3.5 h-3.5" />
					</button>
				</div>
			)}
		</div>
	);
}

function ProgressBar({ progress }: { progress: number }) {
	return (
		<div className="mt-1.5 h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
			<div
				className="h-full bg-gradient-brand rounded-full transition-all duration-200"
				style={{ width: `${Math.min(100, Math.max(4, progress))}%` }}
			/>
		</div>
	);
}

/* ────────────────────────────────────────────────────────────────────────
USAGE

1) Simple, uncontrolled-ish (still call onChange to grab the value yourself):

	<FileUpload
		label="Cover Image"
		multiple={false}
		accept="image/*"
		uploadFn={uploadFile}
		onChange={(v) => console.log(v)} // UploadedFile | null
	/>

	<FileUpload
		label="Gallery"
		multiple
		maxFiles={20}
		accept="image/*"
		uploadFn={uploadFile}
		onChange={(v) => console.log(v)} // UploadedFile[]
	/>

2) With react-hook-form (Controller), same pattern as your other custom
	 inputs (Category isActive toggle etc.) — either Controller or manual
	 watch/setValue both work since FileUpload is a controlled value/onChange
	 component, not a register()-able input:

	import { Controller, useForm } from "react-hook-form";

	const { control, handleSubmit } = useForm();

	<Controller
		name="coverImage"
		control={control}
		rules={{ required: "Cover image is required" }}
		render={({ field, fieldState }) => (
			<FileUpload
				label="Cover Image"
				accept="image/*"
				uploadFn={uploadFile}
				value={field.value}
				onChange={field.onChange}
				onBlur={field.onBlur}
				error={fieldState.error?.message}
			/>
		)}
	/>

	// or, manual setValue/watch style, same as the isActive toggle in
	// CategoryForm:
	<FileUpload
		label="Attachments"
		multiple
		accept=".pdf,.zip,.docx"
		uploadFn={uploadFile}
		value={watch("attachments")}
		onChange={(v) => setValue("attachments", v, { shouldValidate: true })}
		error={errors.attachments?.message as string | undefined}
	/>

3) uploadFn — wire this to Cloudinary/S3/B2. Example with a signed S3 PUT
	 using XHR for real progress:

	export const uploadFile: UploadFn = (file, onProgress) =>
		new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("PUT", presignedUrlFor(file));
			xhr.upload.onprogress = (e) => {
				if (e.lengthComputable) onProgress((e.loaded / e.total) * 100);
			};
			xhr.onload = () =>
				xhr.status < 300
					? resolve({ url: publicUrlFor(file), name: file.name, size: file.size, type: file.type })
					: reject(new Error("Upload failed"));
			xhr.onerror = () => reject(new Error("Network error"));
			xhr.send(file);
		});

	 Or with Cloudinary's unsigned upload + axios for progress:

	export const uploadFile: UploadFn = async (file, onProgress) => {
		const form = new FormData();
		form.append("file", file);
		form.append("upload_preset", "your_preset");
		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/your_cloud/auto/upload",
			form,
			{ onUploadProgress: (e) => onProgress(((e.loaded ?? 0) / (e.total ?? 1)) * 100) }
		);
		return { url: res.data.secure_url, name: file.name, size: file.size, type: file.type, publicId: res.data.public_id };
	};
──────────────────────────────────────────────────────────────────────── */
